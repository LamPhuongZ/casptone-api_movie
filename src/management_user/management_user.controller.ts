import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
  Headers,
  Put,
} from '@nestjs/common';
import { ManagementUserService } from './management_user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { updateUserDTO, userDTO } from './dto/user.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('QuanLyNguoiDung')
@Controller('management-user')
export class ManagementUserController {
  constructor(private readonly managementUserService: ManagementUserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('LayDanhSachLoaiNguoiDung')
  getListUserType() {
    return this.managementUserService.getListUserType();
  }

  @HttpCode(HttpStatus.OK)
  @Get('LayDanhSachNguoiDung')
  getUserList() {
    return this.managementUserService.getUserList();
  }

  @HttpCode(HttpStatus.OK)
  @Get('LayDanhSachNguoiDungPhanTrang')
  getPaginatedUserList(
    @Query('soTrang') pageNumber: string,
    @Query('soPhanTuTrenTrang') pageSize: string,
  ) {
    return this.managementUserService.getPaginatedUserList(
      +pageNumber,
      +pageSize,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('TimKiemNguoiDung')
  getSearchUsers(@Query('tuKhoa') keyWord: string) {
    return this.managementUserService.getSearchUsers(keyWord);
  }

  @HttpCode(HttpStatus.OK)
  @Get('TimKiemNguoiDungPhanTrang')
  getPaginatedSearchUsers(
    @Query('tuKhoa') keyWord: string,
    @Query('soTrang') pageNumber: string,
    @Query('soPhanTuTrenTrang') pageSize: string,
  ) {
    return this.managementUserService.getPaginatedSearchUsers(
      keyWord,
      +pageNumber,
      +pageSize,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('ThongTinTaiKhoan')
  postAccountInfo(@Headers('Authorization') token: string) {
    return this.managementUserService.postAccountInfo(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('LayThongTinNguoiDung')
  etUserInfoByAccount(@Query('taiKhoan') account: string) {
    return this.managementUserService.getUserInfoByAccount(+account);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('ThemNguoiDung')
  createAccount(
    @Body() bodyUser: userDTO,
    @Headers('Authorization') token: string,
  ) {
    return this.managementUserService.createAccount(bodyUser, token);
  }

  @HttpCode(HttpStatus.OK)
  @Put('CapNhatThongTinNguoiDung/:taiKhoan')
  updatePersonalInfo(
    @Param('taiKhoan') account: string,
    @Body() bodyUpdateUser: updateUserDTO,
    @Headers('Authorization') token: string,
  ) {
    return this.managementUserService.updatePersonalInfo(
      +account,
      bodyUpdateUser,
      token,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Delete('XoaNguoiDung')
  deleteUser(
    @Query('taiKhoan') account: string,
    @Headers('Authorization') token: string,
  ) {
    return this.managementUserService.deleteUser(+account, token);
  }
}
