import { Module } from '@nestjs/common';
import { ManagementMovieService } from './management_movie.service';
import { ManagementMovieController } from './management_movie.controller';

@Module({
  controllers: [ManagementMovieController],
  providers: [ManagementMovieService],
})
export class ManagementMovieModule {}
