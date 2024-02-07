import { ApiProperty } from '@nestjs/swagger';

export class cinemaSystemDTO {
  @ApiProperty()
  ma_he_thong_rap: number;

  @ApiProperty()
  ten_he_thong_rap: string;

  @ApiProperty()
  logo: string;

  cumRapChieu: Array<cinemaGroupDTO>;
}

export class cinemaGroupDTO {
  @ApiProperty()
  ma_cum_rap: number;

  @ApiProperty()
  ten_cum_rap: string;

  @ApiProperty()
  dia_chi: string;

  lichChieuPhim: Array<showTimeDTO>;
}

export class showTimeDTO {
  @ApiProperty()
  ma_lich_chieu: number;

  @ApiProperty()
  ma_rap: number;

  @ApiProperty()
  ten_rap: string;

  @ApiProperty()
  ngay_gio_chieu: Date;

  @ApiProperty()
  gia_ve: number;
}
