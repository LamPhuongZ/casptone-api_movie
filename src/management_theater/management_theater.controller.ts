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
  Query,
} from '@nestjs/common';
import { ManagementTheaterService } from './management_theater.service';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Management - Theater')
@Controller('management-theater')
export class ManagementTheaterController {
  constructor(
    private readonly managementTheaterService: ManagementTheaterService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('LayThongTinHeThongRap')
  getTheaterSystem() {
    return this.managementTheaterService.getTheaterSystem();
  }

  @HttpCode(HttpStatus.OK)
  @Get('LayThongTinHeThongRapTheoID')
  getTheaterSystemByID(@Query('maHeThongRap') cinemaSystemID: string) {
    return this.managementTheaterService.getTheaterSystemByID(+cinemaSystemID);
  }

  @HttpCode(HttpStatus.OK)
  @Get('LayThongTinCumRapTheoHeThong')
  getTheaterGroupByTheaterSystem(@Query('maHeThongRap') cinemaSystemID: string) {
    return this.managementTheaterService.getTheaterGroupByTheaterSystem(+cinemaSystemID);
  }

  @HttpCode(HttpStatus.OK)
  @Get('LayThongTinLichChieuHeThongRap')
  getShowtimesFollowCinemaSystem() {
    return this.managementTheaterService.getShowtimesFollowCinemaSystem();
  }

  @HttpCode(HttpStatus.OK)
  @Get('LayThongTinLichChieuHeThongRapTheoMaHeThongRap')
  getShowtimesFollowCinemaSystemID(@Query('maHeThongRap') cinemaSystemID: string) {
    return this.managementTheaterService.getShowtimesFollowCinemaSystemID(+cinemaSystemID);
  }

  @HttpCode(HttpStatus.OK)
  @Get('LayThongTinLichChieuPhim')
  getMovieShowtimeInformation(@Query('maPhim') movieID: string) {
    return this.managementTheaterService.getMovieShowtimeInformation(+movieID);
  }
}
