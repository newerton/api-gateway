import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    // ClientsModule.register([
    //   {
    //     name: 'AUTH_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         brokers: ['host.docker.internal:9094'],
    //       },
    //       consumer: {
    //         groupId: 'auth-consumer',
    //         allowAutoTopicCreation: true,
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
