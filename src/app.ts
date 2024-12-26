import express from "express";
import userRouter from "./routes/user";
import authRouter from "./routes/auth";
import countryRouter from "./routes/country";
import branchRouter from "./routes/branch";
import franchiseRouter from "./routes/franchise.routes";
import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";

import cors from "cors";

const app = express();

app.use((req: Request, res, next) => {
  next();
});
app.use(cors<Request>());
// setup rate limiter: maximum of 30 requests per minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // limit each IP to 1 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/country", countryRouter);
app.use("/branch", branchRouter);

app.use("/franchise", franchiseRouter);
app.use((req, res) => {
  res
    .status(404)
    .send(
      "<html><body><h1>Route Not found try another route</h1></body></html>"
    );
});

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(error.statusCode).json({
    status: "error",
    message: error.message,
  });
});

export default app;
