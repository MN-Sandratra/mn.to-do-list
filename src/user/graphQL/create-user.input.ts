import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType({
  description: 'Used to create a User',
})
export class CreateUserInput {
  @Field(() => String, { description: 'The name of the user' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @Field(() => String, { description: 'The email of the user' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @Field(() => String, { description: 'The password of the user' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}