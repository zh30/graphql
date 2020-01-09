import { InputType, Field } from "type-graphql";
import { Length, IsEmail, Max, Min, IsInt } from "class-validator";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsInt()
  @Min(1)
  @Max(199, {message: "年龄超出限制"})
  age: number;

  @Field()
  password: string;
}
