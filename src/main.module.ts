import { LogLevel, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  ResourceGuard,
  RoleGuard,
  TokenValidation,
} from 'nest-keycloak-connect/keycloak-connect.module';

import { HttpExceptionFilter } from '@app/@common/application/exceptions/filter/http-exception.filter';
import { JoiValidationExceptionFilter } from '@app/@common/application/exceptions/filter/joi-validation-exception.filter';
import { HttpLoggingInterceptor } from '@app/@common/application/interceptors/http-logging.interceptor';
import kafkaConfig from '@app/@common/infrastructure/config/kafka.config';
import keycloakConfig from '@app/@common/infrastructure/config/keycloak.config';
import { ApiServerConfig } from '@core/@shared/infrastructure/config/env/api-server.config';

import { AuthModule } from './app/auth/auth.module';
import { ProductsModule } from './app/products/products.module';
import { UsersModule } from './app/users/users.module';

const providers: Provider[] = [
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: ResourceGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RoleGuard,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: JoiValidationExceptionFilter,
  },
];

if (ApiServerConfig.LOG_ENABLE) {
  providers.push({
    provide: APP_INTERCEPTOR,
    useClass: HttpLoggingInterceptor,
  });
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [kafkaConfig, keycloakConfig],
    }),
    KeycloakConnectModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        debug: config.get<string>('keycloak.debug'),
        authServerUrl: config.get<string>('keycloak.baseInternalUrl'),
        realm: config.get<string>('keycloak.realm'),
        clientId: config.get<string>('keycloak.clientId'),
        secret: config.get<string>('keycloak.secret'),
        realmPublicKey: config.get<string>('keycloak.publicKey'),
        policyEnforcement: config.get<PolicyEnforcementMode>(
          'keycloak.policyEnforcement',
        ),
        tokenValidation: config.get<TokenValidation>(
          'keycloak.tokenValidation',
        ),
        logLevels: config.get<LogLevel[]>('keycloak.logLevels'),
        useNestLogger: config.get<boolean>('keycloak.useNestLogger'),
      }),
    }),
    AuthModule,
    ProductsModule,
    UsersModule,
  ],
  providers,
})
export class MainModule {}
