import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responeData } from 'src/config/response';
import {
  cinemaGroupDTO,
  cinemaSystemDTO,
  showTimeDTO,
} from './dto/theater.dto';

// Còn chức năng lấy thông tin lịch chiếu hệ thống rạp
@Injectable()
export class ManagementTheaterService {
  prisma = new PrismaClient();

  // Get theater system information
  async getTheaterSystem() {
    try {
      let theaterSystem = await this.prisma.tblCinema_system.findMany();

      if (theaterSystem) {
        return responeData(200, 'Get data successfully', theaterSystem);
      } else {
        return responeData(404, 'No data found');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get theater system information by cinemaSystemID
  async getTheaterSystemByID(cinemaSystemID: number) {
    try {
      let theaterSystem = await this.prisma.tblCinema_system.findFirst({
        where: {
          cinemaSystem_id: +cinemaSystemID,
        },
      });

      if (theaterSystem) {
        return responeData(200, 'Get data successfully', theaterSystem);
      } else {
        return responeData(404, 'No data found');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get theater group information by system
  async getTheaterGroupByTheaterSystem(cinemaSystemID: number) {
    try {
      let cinema = await this.prisma.tblCinema_group.findFirst({
        where: {
          cinemaSystem_id: cinemaSystemID,
        },
        include: {
          tblCinema: {
            select: {
              cinema_id: true,
              cinema_name: true,
            },
          },
        },
      });

      if (cinema) {
        return responeData(200, 'Get data successfully', cinema);
      } else {
        return responeData(404, 'No data found');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get information about theater system showtimes
  async getShowtimesFollowCinemaSystem() {
    try {
      


    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get information about theater system showtimes
  async getShowtimesFollowCinemaSystemID(cinemaSystemID: number) {
    try {
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get movie showtime information
  async getMovieShowtimeInformation(movieID: number) {
    try {
      let movie = await this.prisma.tblMovie.findMany({
        where: {
          movie_id: movieID,
        },
      });

      const showtime = await this.prisma.tblShow_times.findMany({
        where: {
          movie_id: movieID,
        },
        include: {
          tblCinema: {
            select: {
              cinema_id: true,
              cinema_name: true,

              tblCinema_group: {
                select: {
                  cinemaGroup_id: true,
                  cinemaGroup_name: true,
                  address: true,

                  tblCinema_system: {
                    select: {
                      cinemaSystem_id: true,
                      cinemaSystem_name: true,
                      logo: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const lichChieuPhim: showTimeDTO[] = showtime?.map((item) => ({
        ma_lich_chieu: item.showTimes_id,
        ma_rap: item.tblCinema.cinema_id,
        ten_rap: item.tblCinema.cinema_name,
        ngay_gio_chieu: item.showing_times,
        gia_ve: item.ticket_price,
      }));

      const cumRapChieu: cinemaGroupDTO[] = showtime?.map((item) => ({
        ma_cum_rap: item.tblCinema.tblCinema_group.cinemaGroup_id,
        ten_cum_rap: item.tblCinema.tblCinema_group.cinemaGroup_name,
        dia_chi: item.tblCinema.tblCinema_group.address,
        lichChieuPhim,
      }));

      const cinemaSytem: cinemaSystemDTO[] = showtime?.map((item) => ({
        ma_he_thong_rap:
          item.tblCinema.tblCinema_group.tblCinema_system.cinemaSystem_id,
        ten_he_thong_rap:
          item.tblCinema.tblCinema_group.tblCinema_system.cinemaSystem_name,
        logo: item.tblCinema.tblCinema_group.tblCinema_system.logo,
        cumRapChieu,
      }));

      const data = {
        movie,
        heThongRap: cinemaSytem,
      };

      if (movie) {
        return responeData(200, 'Get data successfully', data);
      } else {
        return responeData(404, 'Invalid movie code');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
