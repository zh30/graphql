import {
  Arg,
  Mutation,
  Query,
  Resolver,
  FieldResolver,
  Root
} from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../../orm/entity/User";
import { RegisterInput } from "./RegisterInput";

@Resolver(User)
export default class RegisterResolver {
  @Query(() => Boolean)
  async checkUser(@Arg("email") email: string): Promise<Boolean> {
    const user = await User.findOne({ where: { email } });
    return !!user;
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { firstName, lastName, email, age, password }: RegisterInput
  ): Promise<User> {
    const hashePassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      age,
      email,
      password: hashePassword
    }).save();

    return user;
  }
}
