import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey: string = process.env.JWT_SECRET_KEY || "defaultSecret";

export const signToken = async (payload: any): Promise<string> => {
  return await jwt.sign(payload, secretKey, {
    expiresIn:'1h'
  });
};

export const verifyToken = async (token: string): Promise<string | jwt.JwtPayload> => {
  try {
    const decoded = await jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

