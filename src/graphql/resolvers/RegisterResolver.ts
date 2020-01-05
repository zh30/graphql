import {
  Arg,
  Mutation,
  Query,
  Resolver,
  FieldResolver,
  Root
} from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../data/entity/User";

@Resolver(User)
export default class RegisterResolver {
  @Query(() => Boolean)
  async checkUser(@Arg("id") id: number): Promise<Boolean> {
    const user = await User.find({ where: { id } });
    return !!user.length;
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
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
