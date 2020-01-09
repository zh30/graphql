import { User } from "../../../orm/entity/User";
import { Mutation, Arg, Resolver } from "type-graphql";
import { compare } from "bcryptjs";
import { LoginInput } from "./LoginInput";

@Resolver(() => User)
export default class LoginResolver {
  @Mutation(() => User)
  async login(@Arg("data") { email, password }: LoginInput): Promise<User> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("用户名或密码错误");
    }

    const valid = compare(password, user.password);

    if (!valid) {
      throw new Error("用户名或密码错误");
    }

    return user;
  }
}
