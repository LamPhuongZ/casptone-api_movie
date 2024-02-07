import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Headers,
  Query,
} from '@nestjs/common';
import { ManagementBookTicketService } from './management_book-ticket.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { bookSticketDTO } from './dto/bookTicket.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Management - Book - ticket')
@Controller('management-book-ticket')
export class ManagementBookTicketController {
  constructor(
    private readonly managementBookTicketService: ManagementBookTicketService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('DatVe')
  createBookingTicket(
    @Body() bodyBookTicket: bookSticketDTO,
    @Headers('Authorization') token: string,
  ) {
    return this.managementBookTicketService.createBookingTicket(
      // bodyBookTicket,
      // token,
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Get('LayDanhSachPhongVe')
  getTheBoxOfficeList(@Query('maLichChieu') showtimesID: string) {
    return this.managementBookTicketService.getTheBoxOfficeList(+showtimesID);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('TaoLichChieu')
  createShowtimes(
    @Body() bodyBookTicket: bookSticketDTO,
    @Headers('Authorization') token: string,
  ) {
    return this.managementBookTicketService.createShowtimes(
      bodyBookTicket,
      token,
    );
  }
}
