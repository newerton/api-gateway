import { HttpModule } from '@nestjs/axios';
import { Module, Provider } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ApiServerConfig } from '@core/@shared/infrastructure/config/env';

import { AuthCredentialsController } from './controllers/auth-credentials.controller';
import { AuthLoginAppleController } from './controllers/auth-login-apple.controller';
import { AuthLoginFacebookController } from './controllers/auth-login-facebook.controller';
import { AuthLoginGoogleController } from './controllers/auth-login-google.controller';
import { AuthLoginController } from './controllers/auth-login.controller';
import { AuthCredentialsUseCase } from './use-cases/auth-credentials.use-case';
import { AuthLoginAppleUseCase } from './use-cases/auth-login-apple.use-case';
import { AuthLoginFacebookUseCase } from './use-cases/auth-login-facebook.use-case';
import { AuthLoginGoogleUseCase } from './use-cases/auth-login-google.use-case';
import { AuthLoginUseCase } from './use-cases/auth-login.use-case';

const useCases: Provider[] = [
  AuthCredentialsUseCase,
  AuthLoginAppleUseCase,
  AuthLoginFacebookUseCase,
  AuthLoginGoogleUseCase,
  AuthLoginUseCase,
];
@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: ApiServerConfig.AUTH_ENGINE_PORT,
        },
      },
    ]),
  ],
  controllers: [
    AuthCredentialsController,
    AuthLoginAppleController,
    AuthLoginFacebookController,
    AuthLoginGoogleController,
    AuthLoginController,
  ],
  providers: [...useCases],
  // exports: [...useCases],
})
export class AuthModule {}
