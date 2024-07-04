import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: 'The email of the user' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @Field(() => String, { description: 'The password of the user' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
