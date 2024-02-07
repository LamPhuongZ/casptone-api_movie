import { ApiProperty } from '@nestjs/swagger';

export class createUserDTO {
  @ApiProperty({ description: 'email', type: String })
  email: string;

  @ApiProperty({ description: 'password', type: String })
  pass_word: string;

  @ApiProperty({ description: 'full name', type: String })
  full_name: string;

  @ApiProperty({ description: 'phone number', type: String })
  phone: string;

  @ApiProperty({ description: 'avatar', type: String })
  avatar: string;
}

export class updateUserDTO {
  @ApiProperty()
  full_name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  pass_word: string;

  @ApiProperty()
  user_type: string;
}

export class userDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  pass_word: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  user_type: string;
}

export class userInformationDTO {
  @ApiProperty()
  tai_khoan: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  ho_ten: string;

  @ApiProperty()
  soDT: string;

  @ApiProperty()
  mat_khau: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  ma_loai_nguoi_dung: string;
}

export class ticketBookingInfomationDTO {
  @ApiProperty()
  ten_phim: string;

  @ApiProperty()
  hinh_anh: string;

  @ApiProperty()
  gia_ve: number;

  danhSachGhe: Array<seatListDTO>;
}

export class seatListDTO {
  @ApiProperty()
  ma_he_thong_rap: number;

  @ApiProperty()
  ten_he_thong_rap: string;

  @ApiProperty()
  ma_cum_rap: number;

  @ApiProperty()
  ten_cum_rap: string;

  @ApiProperty()
  ma_rap: number;

  @ApiProperty()
  ten_rap: string;

  @ApiProperty()
  ma_ghe: number;

  @ApiProperty()
  ten_ghe: string;
}
