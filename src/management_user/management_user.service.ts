import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, tblUser } from '@prisma/client';
import { responeData, responseArray } from 'src/config/response';
import { Roles } from 'src/roles/roles.enum';
import {
  seatListDTO,
  ticketBookingInfomationDTO,
  updateUserDTO,
  userDTO,
  userInformationDTO,
} from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagementUserService {
  // Vẫn còn 1 phần cập nhật thông tin chưa làm
  constructor(private jwtService: JwtService) {}

  prisma = new PrismaClient();

  // Get list user type
  async getListUserType() {
    try {
      let userType = [
        {
          ma_loai_nguoi_dung: 'Admin',
          ten_loai_nguoi_dung: Roles.ADMIN,
        },
        {
          ma_loai_nguoi_dung: 'User',
          ten_loai_nguoi_dung: Roles.USER,
        },
      ];

      return responeData(200, 'Get data successfully', userType);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get list user
  async getUserList() {
    try {
      const data = await this.prisma.tblUser.findMany();

      const userList: userInformationDTO[] = data?.map((item) => ({
        tai_khoan: item.account,
        email: item.email,
        ho_ten: item.full_name,
        soDT: item.phone,
        mat_khau: item.pass_word,
        avatar: item.avatar,
        ma_loai_nguoi_dung: item.user_type,
      }));

      if (data.length > 0) {
        return responeData(200, 'Get data successfully', userList);
      } else {
        return responeData(404, 'No data found');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get list user follow page
  // cần xem lại cách hiển thị phân trang, có thể làm giống với hệ thống mẫu không
  async getPaginatedUserList(pageNumber: number, pageSize: number) {
    try {
      const index = (pageNumber - 1) * pageSize;

      const page = await this.prisma.tblUser.findMany({
        orderBy: { account: 'desc' },
        take: pageSize,
        skip: index,
      });

      const paginatedUserList: userInformationDTO[] = page?.map((item) => ({
        tai_khoan: item.account,
        email: item.email,
        ho_ten: item.full_name,
        soDT: item.phone,
        mat_khau: item.pass_word,
        avatar: item.avatar,
        ma_loai_nguoi_dung: item.user_type,
      }));

      if (page.length > 0) {
        return responeData(
          200,
          'Get data successfully',
          // index,
          paginatedUserList,
        );
      } else {
        return responeData(404, 'No data found');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Search users
  async getSearchUsers(keyWord: string) {
    try {
      let search = await this.prisma.tblUser.findMany({
        where: {
          full_name: {
            contains: `%${keyWord}%`,
          },
        },
      });

      const searchUsersList: userInformationDTO[] = search?.map((item) => ({
        tai_khoan: item.account,
        email: item.email,
        ho_ten: item.full_name,
        soDT: item.phone,
        mat_khau: item.pass_word,
        avatar: item.avatar,
        ma_loai_nguoi_dung: item.user_type,
      }));

      if (search.length > 0) {
        return responeData(200, 'Get data successfully', searchUsersList);
      } else {
        return responeData(404, 'No data found');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Search users follow page
  // cần xem lại cách hiển thị phân trang, có thể làm giống với hệ thống mẫu không
  async getPaginatedSearchUsers(
    keyWord: string,
    pageNumber: number,
    pageSize: number,
  ) {
    try {
      const index = (pageNumber - 1) * pageSize;

      let searchFollowPage = await this.prisma.tblUser.findMany({
        orderBy: { account: 'desc' },
        take: pageSize,
        skip: index,
        where: {
          full_name: {
            contains: `%${keyWord}%`,
          },
        },
      });

      const paginatedUserList: userInformationDTO[] = searchFollowPage?.map(
        (item) => ({
          tai_khoan: item.account,
          email: item.email,
          ho_ten: item.full_name,
          soDT: item.phone,
          mat_khau: item.pass_word,
          avatar: item.avatar,
          ma_loai_nguoi_dung: item.user_type,
        }),
      );

      if (searchFollowPage.length > 0) {
        return responeData(
          200,
          'Get data successfully',
          // index,
          paginatedUserList,
        );
      } else {
        return responeData(404, 'No data found');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Account Information
  async postAccountInfo(token: string) {
    try {
      let payload: tblUser | any = this.jwtService.decode(token.split(' ')[1]);

      const user = await this.prisma.tblUser.findFirst({
        where: {
          account: payload.account,
        },
      });

      const booking = await this.prisma.tblBook_ticket.findMany({
        where: {
          account: payload.account,
        },
        include: {
          tblSeat: {
            select: {
              seat_id: true,
              seat_name: true,
            },
          },

          tblShow_times: {
            select: {
              ticket_price: true,

              tblMovie: {
                select: {
                  movie_name: true,
                  movie_image: true,
                },
              },

              tblCinema: {
                select: {
                  cinema_id: true,
                  cinema_name: true,

                  tblCinema_group: {
                    select: {
                      cinemaGroup_id: true,
                      cinemaGroup_name: true,

                      tblCinema_system: {
                        select: {
                          cinemaSystem_id: true,
                          cinemaSystem_name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      // Đoạn này liên quan phần hiển thị tiếng việt nên đặt tên theo tiếng việt, chưa tìm đc cách khắc phục
      const danhSachGhe: seatListDTO[] = booking?.map((item) => ({
        ma_he_thong_rap:
          item.tblShow_times.tblCinema.tblCinema_group.tblCinema_system
            .cinemaSystem_id,
        ten_he_thong_rap:
          item.tblShow_times.tblCinema.tblCinema_group.tblCinema_system
            .cinemaSystem_name,
        ma_cum_rap: item.tblShow_times.tblCinema.tblCinema_group.cinemaGroup_id,
        ten_cum_rap:
          item.tblShow_times.tblCinema.tblCinema_group.cinemaGroup_name,
        ma_rap: item.tblShow_times.tblCinema.cinema_id,
        ten_rap: item.tblShow_times.tblCinema.cinema_name,
        ma_ghe: item.tblSeat.seat_id,
        ten_ghe: item.tblSeat.seat_name,
      }));

      const ticketBookingInfomation: ticketBookingInfomationDTO[] =
        booking?.map((item) => ({
          ten_phim: item.tblShow_times.tblMovie.movie_name,
          hinh_anh: item.tblShow_times.tblMovie.movie_image,
          gia_ve: item.tblShow_times.ticket_price,
          danhSachGhe,
        }));

      const data = {
        tai_khoan: user.account,
        ho_ten: user.full_name,
        email: user.email,
        so_dt: user.phone,
        loaiNguoiDung: {
          ten_loai_nguoi_dung: user.user_type,
        },
        thongTinDatVe: ticketBookingInfomation,
      };

      return responeData(200, 'Get data successfully', data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get account infomation
  async getUserInfoByAccount(account: number) {
    try {
      const user = await this.prisma.tblUser.findFirst({
        where: {
          account: account,
        },
      });

      const booking = await this.prisma.tblBook_ticket.findMany({
        where: {
          account: account,
        },
        include: {
          tblSeat: {
            select: {
              seat_id: true,
              seat_name: true,
            },
          },

          tblShow_times: {
            select: {
              ticket_price: true,

              tblMovie: {
                select: {
                  movie_name: true,
                  movie_image: true,
                },
              },

              tblCinema: {
                select: {
                  cinema_id: true,
                  cinema_name: true,

                  tblCinema_group: {
                    select: {
                      cinemaGroup_id: true,
                      cinemaGroup_name: true,

                      tblCinema_system: {
                        select: {
                          cinemaSystem_id: true,
                          cinemaSystem_name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      // Đoạn này liên quan phần hiển thị tiếng việt nên đặt tên theo tiếng việt, chưa tìm đc cách khắc phục
      const danhSachGhe: seatListDTO[] = booking?.map((item) => ({
        ma_he_thong_rap:
          item.tblShow_times.tblCinema.tblCinema_group.tblCinema_system
            .cinemaSystem_id,
        ten_he_thong_rap:
          item.tblShow_times.tblCinema.tblCinema_group.tblCinema_system
            .cinemaSystem_name,
        ma_cum_rap: item.tblShow_times.tblCinema.tblCinema_group.cinemaGroup_id,
        ten_cum_rap:
          item.tblShow_times.tblCinema.tblCinema_group.cinemaGroup_name,
        ma_rap: item.tblShow_times.tblCinema.cinema_id,
        ten_rap: item.tblShow_times.tblCinema.cinema_name,
        ma_ghe: item.tblSeat.seat_id,
        ten_ghe: item.tblSeat.seat_name,
      }));

      const ticketBookingInfomation: ticketBookingInfomationDTO[] =
        booking?.map((item) => ({
          ten_phim: item.tblShow_times.tblMovie.movie_name,
          hinh_anh: item.tblShow_times.tblMovie.movie_image,
          gia_ve: item.tblShow_times.ticket_price,
          danhSachGhe,
        }));

      const data = {
        tai_khoan: user.account,
        ho_ten: user.full_name,
        email: user.email,
        so_dt: user.phone,
        loaiNguoiDung: {
          ten_loai_nguoi_dung: user.user_type,
        },
        thongTinDatVe: ticketBookingInfomation,
      };

      if (user) {
        return responeData(200, 'Get data successfully', data);
      } else {
        return responeData(404, 'No data found');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Create user
  async createAccount(bodyUser: userDTO, token: string) {
    try {
      let payload: tblUser | any = await this.jwtService.decode(
        token.split(' ')[1],
      );

      const checkAccountExist = await this.prisma.tblUser.findFirst({
        where: {
          email: bodyUser.email,
        },
      });

      if (payload.user_type === Roles.ADMIN) {
        if (checkAccountExist) {
          return responeData(400, 'Email already existed!');
        } else {
          const createData = await this.prisma.tblUser.create({
            data: {
              email: bodyUser.email,
              full_name: bodyUser.full_name,
              phone: bodyUser.phone,
              pass_word: bcrypt.hashSync(bodyUser.pass_word, 10),
              avatar: null,
              user_type: Roles.USER,
            },
          });
          return responeData(200, 'Create user successfully!', createData);
        }
      } else {
        return responeData(403, 'You have no rights to this resource');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // PUT Update user infomation (individual)
  async updatePersonalInfo(
    account: number,
    bodyUser: updateUserDTO,
    token: string,
  ) {
    try {
      let payload: tblUser | any = await this.jwtService.decode(
        token.split(' ')[1],
      );

      const checkAccount = await this.prisma.tblUser.findFirst({
        where: {
          account: payload.account,
          email: payload.email,
        },
      });

      const isAccount = await this.prisma.tblUser.findFirst({
        where: {
          account: account,
        },
      });

      if (checkAccount.account !== isAccount.account) {
        return responeData(
          403,
          "You do not have the right to change other people's accounts!!!",
        );
      } else {
        if (isAccount) {
          const updateData = await this.prisma.tblUser.update({
            where: {
              account: account,
            },
            data: {
              full_name: bodyUser.full_name,
              phone: bodyUser.phone,
              pass_word: bcrypt.hashSync(bodyUser.pass_word, 10),
              user_type: payload.user_type,
            },
          });

          return responeData(200, 'Update user successfully!', updateData);
        } else {
          return responeData(404, 'No data found');
        }
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Delete user
  async deleteUser(account: number, token: string) {
    try {
      let payload: tblUser | any = this.jwtService.decode(token.split(' ')[1]);

      const checkUserExist = await this.prisma.tblUser.findFirst({
        where: {
          account: account,
        },
      });

      // Kiểm tra xem người dùng này đã có đặt vé hay chưa?
      const checkAccountHasTicket = await this.prisma.tblBook_ticket.findFirst({
        where: {
          account: account,
        },
      });

      let data: any;

      if (payload.user_type === Roles.ADMIN) {
        if (checkUserExist) {
          if (checkAccountHasTicket) {
            data = await this.prisma.tblBook_ticket.deleteMany({
              where: {
                account: account,
              },
            });
          }

          data = await this.prisma.tblUser.delete({
            where: {
              account: account,
            },
          });

          return responeData(200, 'Delete user successfully!', data);
        } else {
          return responeData(404, 'No data found');
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
}
