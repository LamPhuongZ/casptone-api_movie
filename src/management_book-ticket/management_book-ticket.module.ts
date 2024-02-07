import { Module } from '@nestjs/common';
import { ManagementBookTicketService } from './management_book-ticket.service';
import { ManagementBookTicketController } from './management_book-ticket.controller';

@Module({
  controllers: [ManagementBookTicketController],
  providers: [ManagementBookTicketService],
})
export class ManagementBookTicketModule {}
