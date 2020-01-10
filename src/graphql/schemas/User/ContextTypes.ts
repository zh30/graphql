import { Request, Response } from "express";

export default interface ContextTypes {
  req: Request;
  res: Response;
}
