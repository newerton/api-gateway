import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ApiServerConfig } from '@core/@shared/infrastructure/config/env';

import { UserChangePasswordController } from './controllers/user-change-password.controller';
import { UserCreateController } from './controllers/user-create.controller';
import { UserForgotPasswordController } from './controllers/user-forgot-password.controller';
import { UserMeController } from './controllers/user-me.controller';
import { UserUpdateController } from './controllers/user-update.controller';
import { UserChangePasswordUseCase } from './use-cases/user-change-password.use-case';
import { UserCreateUseCase } from './use-cases/user-create.use-case';
import { UserForgotPasswordUseCase } from './use-cases/user-forgot-password.use-case';
import { UserMeUseCcase } from './use-cases/user-me.use-case';
import { UserUpdateUseCase } from './use-cases/user-update.use-case';

const useCases = [
  UserChangePasswordUseCase,
  UserCreateUseCase,
  UserForgotPasswordUseCase,
  UserMeUseCcase,
  UserUpdateUseCase,
];
@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: ApiServerConfig.USER_ENGINE_PORT,
        },
      },
    ]),
  ],
  controllers: [
    UserChangePasswordController,
    UserCreateController,
    UserForgotPasswordController,
    UserMeController,
    UserUpdateController,
  ],
  providers: [...useCases],
  exports: [...useCases],
})
export class UsersModule {}
