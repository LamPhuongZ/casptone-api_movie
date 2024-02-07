import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagementUserModule } from './management_user/management_user.module';
import { ManagementTheaterModule } from './management_theater/management_theater.module';
import { ManagementMovieModule } from './management_movie/management_movie.module';
import { ManagementBookTicketModule } from './management_book-ticket/management_book-ticket.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ManagementUserModule,
    ManagementTheaterModule,
    ManagementMovieModule,
    ManagementBookTicketModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
