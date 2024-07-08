import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  getUserToken(payload: { sub: Types.ObjectId; usermail: string }) {
    const authenticatedUserToken = this.jwtService.signAsync(payload);

    return authenticatedUserToken;
  }
}
