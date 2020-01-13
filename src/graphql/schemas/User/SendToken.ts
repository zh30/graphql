import { Response } from "express";

export const SendToken = (res: Response, token: string): void => {
  res.cookie("jid", token, {
    httpOnly: true
  });
};
