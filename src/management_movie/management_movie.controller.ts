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
  Headers,
} from '@nestjs/common';
import { ManagementMovieService } from './management_movie.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Management - Movie')
@Controller('management-movie')
export class ManagementMovieController {
  constructor(
    private readonly managementMovieService: ManagementMovieService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('LayDanhSachBanner')
  getBannersList() {
    return this.managementMovieService.getBannersList();
  }

  @HttpCode(HttpStatus.OK)
  @Get('LayDanhSachPhim')
  getMovieList() {
    return this.managementMovieService.getMovieList();
  }

  @HttpCode(HttpStatus.OK)
  @Get('LayDanhSachPhimTheoTen')
  getMovieListByName(@Query('tenPhim') movieName: string) {
    return this.managementMovieService.getMovieListByName(movieName);
  }

  @HttpCode(HttpStatus.OK)
  @Get('LayDanhSachPhimPhanTrang')
  getPaginateListOfMovies(pageNumber: number, pageSize: number) {
    return this.managementMovieService.getPaginateListOfMovies(
      +pageNumber,
      +pageSize,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('LayDanhSachPhimTheoNgay')
  getMovieListByDate(pageNumber: number, pageSize: number, ) {
    return this.managementMovieService.getMovieListByDate(
      // +pageNumber,
      // +pageSize,
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('ThemPhimUploadHinh')
  createMovieUploadImage(pageNumber: number, pageSize: number, ) {
    return this.managementMovieService.createMovieUploadImage(
      // +pageNumber,
      // +pageSize,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('CapNhatPhimUpload')
  updateMovieUpload(pageNumber: number, pageSize: number, ) {
    return this.managementMovieService.updateMovieUpload(
      // +pageNumber,
      // +pageSize,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('QuanLyPhim')
  managementMovie(pageNumber: number, pageSize: number, ) {
    return this.managementMovieService.managementMovie(
      // +pageNumber,
      // +pageSize,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Delete('XoaPhim')
  deleteMovie(
    @Query('maPhim') movieID: string,
    @Headers('Authorization') token: string,
  ) {
    return this.managementMovieService.deleteMovie(+movieID, token);
  }

  @HttpCode(HttpStatus.OK)
  @Get('LayThongTinPhim/:maPhim')
  getMovieInfomation(@Param('maPhim') movieID: string) {
    return this.managementMovieService.getMovieInfomation(+movieID);
  }
}
