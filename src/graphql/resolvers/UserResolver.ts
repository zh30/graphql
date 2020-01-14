import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Ctx,
  UseMiddleware
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "../../orm/entity/User";
import { RegisterInput } from "../schemas/User/RegisterInput";
import { LoginInput } from "../schemas/User/LoginInput";
import ContextTypes from "../schemas/User/ContextTypes";
import { createAccessToken, isAuth } from "../schemas/User/Auth";
import { SendToken } from "../schemas/User/SendToken";
import { verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../../config";

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

  @Mutation(type => User, { nullable: true })
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() { res }: ContextTypes
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("用户名或密码错误");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("用户名或密码错误");
    }

    SendToken(res, createAccessToken(user));

    return user;
  }

  // @UseMiddleware(isAuth)
  @Query(type => Boolean)
  bye(@Ctx() { res }: ContextTypes) {
    res.clearCookie("jid");
    return true;
  }

  @Query(type => User, { nullable: true })
  async me(
    @Ctx() { req: { signedCookies } }: ContextTypes
  ): Promise<User | null> {
    const token: string = signedCookies["jid"];
    let id: string;

    if (!token) {
      return null;
    }

    const payload = verify(token, ACCESS_TOKEN_SECRET!);
    console.info("Payload: ", payload);
    if (!payload) {
      return null;
    }

    return User.findOne({
      where: { id: "a72ebcd8-89d9-46d0-a282-006554fee536" }
    });
  }
}
