import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class TokenTypes {
  @Field()
  accessToken: string;
}
