import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "../../orm/entity/User";
import { RegisterInput } from "../schemas/User/RegisterInput";
import { LoginInput } from "../schemas/User/LoginInput";
import ContextTypes from "../schemas/User/ContextTypes";
import { createAccessToken } from "../schemas/User/Auth";

@Resolver(type => User)
export default class UserResolver {
  @Query(type => Boolean)
  async checkUser(@Arg("email") email: string): Promise<Boolean> {
    const user = await User.findOne({ where: { email } });
    return !!user;
  }

  @Query(type => [User])
  async users(): Promise<User[]> {
    const users = await User.find();

    return users;
  }

  @Mutation(type => User)
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

  @Mutation(type => User)
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() { res }: ContextTypes
  ): Promise<User> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("用户名或密码错误");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("用户名或密码错误");
    }

    res.cookie("jid", createAccessToken(user), {
      httpOnly: true
    });

    return user;
  }
}
