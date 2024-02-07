import { Module } from '@nestjs/common';
import { ManagementTheaterService } from './management_theater.service';
import { ManagementTheaterController } from './management_theater.controller';

@Module({
  controllers: [ManagementTheaterController],
  providers: [ManagementTheaterService],
})
export class ManagementTheaterModule {}
