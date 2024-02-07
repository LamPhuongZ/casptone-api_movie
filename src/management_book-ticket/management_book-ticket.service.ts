import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, tblUser } from '@prisma/client';
import { bookSticketDTO } from './dto/bookTicket.dto';
import { Roles } from 'src/roles/roles.enum';
import { responeData } from 'src/config/response';

@Injectable()
export class ManagementBookTicketService {
  constructor(private jwtService: JwtService) {}

  prisma = new PrismaClient();

  // Create booking ticket
  async createBookingTicket() {
    try {
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get the box office list
  async getTheBoxOfficeList(showtimesID: number) {
    try {
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Create showtimes
  async createShowtimes(bodyBookTicket: bookSticketDTO, token: string) {
    try {
      let payload: tblUser | any = await this.jwtService.decode(
        token.split(' ')[1],
      );

      if (payload.user_type === Roles.ADMIN) {
        const createData = await this.prisma.tblShow_times.create({
          data: {
            movie_id: bodyBookTicket.movie_id,
            cinema_id: bodyBookTicket.cinema_id,
            showing_times: bodyBookTicket.showing_times,
            ticket_price: bodyBookTicket.ticket_price,
          },
        });

        return responeData(200, 'Create user successfully!', createData);
      } else {
        return responeData(403, 'You have no rights to this resource');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
