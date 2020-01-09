import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { hash } from "bcryptjs";
import { User } from "../../../orm/entity/User";
import { RegisterInput } from "./RegisterInput";

@Resolver(() => User)
export default class RegisterResolver {
  @Query(() => Boolean)
  async checkUser(@Arg("email") email: string): Promise<Boolean> {
    const user = await User.findOne({ where: { email } });
    return !!user;
  }

  @Query(type => [User])
  async users(): Promise<User[]> {
    const users = await User.find();

    return users;
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { firstName, lastName, email, age, password }: RegisterInput
  ): Promise<User> {
    const hashePassword = await hash(password, 12);
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
