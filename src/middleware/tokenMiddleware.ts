import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { HttpError, HttpStatus } from "../utils/httpError";

// Middleware for role-based access
const verifyTokenAndRole = (allowedRoles: number[]) => {
  interface DecodedToken {
    id: number;
    iat: number; // issued at
    exp: number; // expiration
  }
  const prisma = new PrismaClient();

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract token from header
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "JWT token required" });
      }

      // Verify token
      const decoded: DecodedToken = jwt.verify(
        token,
        config.SECRET_KEY
      ) as DecodedToken;
      if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
      }
      // Fetch user details and role from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          userDetails: {
            where: { isActive: true },
            select: {
              userRoleId: true, // Fetch userRoleId to compare
            },
          },
        },
      });

      if (!user || !user.userDetails?.length) {
        return res
          .status(404)
          .json({ message: "User not found or not active" });
      }

      const userRoleId = user.userDetails[0].userRoleId;

      // Check if userRoleId is in the allowedRoles array
      if (!allowedRoles.includes(userRoleId)) {
        return res
          .status(403)
          .json({ message: "Forbidden: You do not have the required role" });
      }

      next();
    } catch (err: any) {
      if ((err.message = "jwt expired")) {
        throw new HttpError(
          HttpStatus.FORBIDDEN,
          "Token is expired please login again"
        );
      }
    }
  };
};

export default verifyTokenAndRole;
