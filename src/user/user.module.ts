import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserHandler } from './commands/createUser/create-user.handler';
import { LoginUserHandler } from './queries/loginUser/login-user.handler';
import { User, UserSchema } from './schemas/user.schema';
import { UserResolver } from './user.resolver';

const commandHandlers = [CreateUserHandler];
const queryHandlers = [LoginUserHandler];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserResolver, ...commandHandlers, ...queryHandlers, AuthService],
})
export class UserModule {}
