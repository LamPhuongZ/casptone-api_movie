import { Module } from '@nestjs/common';
import { ManagementUserService } from './management_user.service';
import { ManagementUserController } from './management_user.controller';

@Module({
  controllers: [ManagementUserController],
  providers: [ManagementUserService],
})
export class ManagementUserModule {}
