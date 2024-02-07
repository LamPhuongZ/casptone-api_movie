import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, tblUser } from '@prisma/client';
import { responeData } from 'src/config/response';
import { Roles } from 'src/roles/roles.enum';

@Injectable()
export class ManagementMovieService {
  prisma = new PrismaClient();

  constructor(private jwtService: JwtService) {}

  // Get banner list
  async getBannersList() {
    try {
      let banner = await this.prisma.tblBanner.findMany();

      if (banner) {
        return responeData(200, 'Get data successfully', banner);
      } else {
        return responeData(404, 'No data found');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get movie list
  async getMovieList() {
    try {
      let movies = await this.prisma.tblMovie.findMany();

      if (movies) {
        return responeData(200, 'Get data successfully', movies);
      } else {
        return responeData(404, 'No data found');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get movie list by name
  async getMovieListByName(movieName: string) {
    try {
      let moviesByName = await this.prisma.tblMovie.findMany({
        where: {
          movie_name: {
            contains: `%${movieName}%`,
          },
        },
      });

      if (moviesByName) {
        return responeData(200, 'Get data successfully', moviesByName);
      } else {
        return responeData(404, 'No data found');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get the paginated list of movies
  async getPaginateListOfMovies(pageNumber: number, pageSize: number) {
    try {
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get movie list by date
  async getMovieListByDate() {
    try {
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Create movie upload image
  async createMovieUploadImage() {
    try {
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Update movie upload
  async updateMovieUpload() {
    try {
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Management movie
  async managementMovie() {
    try {
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  // Delete movie
  async deleteMovie(movieID: number, token: string) {
    try {
      let payload: tblUser | any = this.jwtService.decode(token.split(' ')[1]);

      let movies = await this.prisma.tblMovie.findFirst({
        where: {
          movie_id: movieID,
        },
      });

      // Kiểm tra mã phim có ở banner ko
      let checkBannerExist = await this.prisma.tblBanner.findFirst({
        where: {
          movie_id: movieID,
        },
      });

      // Kiểm tra mã phim có ở lịch chiếu không
      let checkShowTimeExist = await this.prisma.tblShow_times.findFirst({
        where: {
          movie_id: movieID,
        },
      });

      let data: any;

      if (payload.user_type === Roles.ADMIN) {
        if (movies) {
          if (checkBannerExist) {
            data = await this.prisma.tblBanner.deleteMany({
              where: {
                movie_id: movieID,
              },
            });
          }

          if (checkShowTimeExist) {
            let checkBookTicket = await this.prisma.tblBook_ticket.findMany({
              where: {
                showTimes_id: checkShowTimeExist.showTimes_id,
              },
            });

            if (checkBookTicket) {
              data = await this.prisma.tblBook_ticket.deleteMany({
                where: {
                  showTimes_id: checkShowTimeExist.showTimes_id,
                },
              });
            }

            data = await this.prisma.tblShow_times.deleteMany({
              where: {
                movie_id: movieID,
              },
            });
          }

          data = await this.prisma.tblMovie.delete({
            where: {
              movie_id: movieID,
            },
          });

          return responeData(200, 'Delete movie successfully!', data);
        } else {
          return responeData(404, 'Invalid movie code');
        }
      } else {
        return responeData(
          403,
          "You do not have the right to change other people's accounts!!!",
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get movie information
  async getMovieInfomation(movieID: number) {
    try {
      let moviesByID = await this.prisma.tblMovie.findMany({
        where: {
          movie_id: movieID,
        },
      });

      if (moviesByID) {
        return responeData(200, 'Get data successfully', moviesByID);
      } else {
        return responeData(404, 'Invalid movie code');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
