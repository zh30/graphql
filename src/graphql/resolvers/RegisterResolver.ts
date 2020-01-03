import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../data/entity/User";

@Resolver()
export default class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hi He!";
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("age") age: number,
    @Arg("password") password: string
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
