import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { createUserDTO } from 'src/management_user/dto/user.dto';
import { Response } from 'express';
import { authDTO } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/sign-up')
  signUp(@Body() body: createUserDTO, @Res() res: Response) {
    return this.authService.signUp(body, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() body: authDTO, @Res() res: Response) {
    return this.authService.login(body, res);
  }
}
