import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  getUserToken(_id: string | Types.ObjectId) {
    const authenticatedUserToken = jwt.sign({ _id }, 'express', {
      expiresIn: '7d',
    });

    return authenticatedUserToken;
  }
}
