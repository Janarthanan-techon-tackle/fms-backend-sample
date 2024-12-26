import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";

export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}

export default (
    schema: Schema,
    source: ValidationSource = ValidationSource.BODY
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source]);

    if (!error) return next();

    const { details } = error;
    const message = details
      .map((i) => i.message.replace(/['"]+/g, ""))
      .join(",");

    res.status(400).json({ message });
  };
