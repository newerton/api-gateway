import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ExceptionFilter } from './common/filters/rpc-exception.filter';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AllExceptionFilter } from './common/filters/exception.filter';
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  ResourceGuard,
  RoleGuard,
  TokenValidation,
} from './common/auth/keycloak';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KeycloakConnectModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        debug: config.get('DEBUG') === '1',
        authServerUrl: `${config.get('KEYCLOAK_BASE_URL')}/auth`,
        realm: config.get('KEYCLOAK_REALM') || '',
        clientId: config.get('KEYCLOAK_CLIENT_ID') || '',
        secret: config.get('KEYCLOAK_SECRET') || '',
        realmPublicKey: config.get('JWT_PUBLIC_KEY') || '',
        policyEnforcement: PolicyEnforcementMode.ENFORCING,
        tokenValidation: TokenValidation.OFFLINE,
        logLevels: ['log', 'debug', 'error', 'verbose', 'warn'],
        useNestLogger: false,
      }),
    }),
  ],
  providers: [
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
      useClass: ExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
