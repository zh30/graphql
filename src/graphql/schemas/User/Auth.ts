import { User } from "../../../orm/entity/User";
import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../../config";

export const createAccessToken = (user: User): string =>
  sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

export const createRefreshToken = (user: User): string =>
  sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
