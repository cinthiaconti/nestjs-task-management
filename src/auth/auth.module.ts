import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
  ]
})

export class AuthModule {}

//import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
//   const req = ctx.switchToHttp().getRequest();
//   return req.user;
// });