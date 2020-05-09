import { User } from "../../../orm/entity/User";
import { sign, verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../../config";
import { MiddlewareFn } from "type-graphql";
import ContextTypes from "./ContextTypes";

export const createAccessToken = (user: User): string =>
  sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1s" }
  );

export const createRefreshToken = (user: User): string =>
  sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

export const isAuth: MiddlewareFn<ContextTypes> = (con, next) => {
  console.info("Con: ", con);
  debugger;
  // const authorization = context.req.headers["authorization"];

  // if (!authorization) {
  //   throw new Error("not authenticated");
  // }

  // try {
  //   const token = authorization.split(" ")[1];
  //   const payload = verify(token, ACCESS_TOKEN_SECRET!);
  //   context.payload = payload as any;
  // } catch (error) {
  //   console.error("Error: ", error);
  //   throw new Error("not authenticated");
  // }

  return next();
};
