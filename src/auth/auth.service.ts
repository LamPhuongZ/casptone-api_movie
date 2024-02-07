import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { createUserDTO } from 'src/management_user/dto/user.dto';
import { Roles } from 'src/roles/roles.enum';
import { authDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  prisma = new PrismaClient();

  async signUp(userSignUp: createUserDTO, res: Response) {
    try {
      let checkUser = await this.prisma.tblUser.findFirst({
        where: {
          email: userSignUp.email,
        },
      });

      if (!checkUser) {
        let createUser = await this.prisma.tblUser.create({
          data: {
            email: userSignUp.email,
            pass_word: bcrypt.hashSync(userSignUp.pass_word, 10),
            full_name: userSignUp.full_name,
            phone: userSignUp.phone,
            avatar: null,
            user_type: Roles.USER,
          },
        });

        return res.status(200).json({
          status: '200',
          message: 'Signup successfully',
          createUser,
        });
      } else {
        return res.status(404).json({
          status: '404',
          message: 'Email already existed',
        });
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(userLogin: authDTO, res: Response) {
    try {
      let checkUser = await this.prisma.tblUser.findFirst({
        where: {
          email: userLogin.email,
        },
      });

      if (checkUser) {
        if (
          bcrypt.compareSync(userLogin.pass_word, checkUser.pass_word) ||
          userLogin.pass_word === checkUser.pass_word
        ) {
          checkUser = { ...checkUser, pass_word: '' };

          let token = await this.jwtService.signAsync(checkUser, {
            secret: this.configService.get('KEY'),
            expiresIn: '1d',
          });

          const data = { user: checkUser, token: token };

          return res.status(200).json({
            status: '200',
            message: 'Login successfully',
            data,
          });
        } else {
          return res.status(400).json({
            status: '400',
            message: 'Wrong password',
          });
        }
      } else {
        return res.status(404).json({
          status: '404',
          message: 'User not found',
        });
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
