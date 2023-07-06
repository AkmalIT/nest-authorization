import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || "SECRET_KEY",
      signOptions: {
        expiresIn: "24h"
      }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [
    JwtModule,
    AuthService
  ]
})
export class AuthModule {}
