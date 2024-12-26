import bcrypt from "bcrypt";
import { config } from "../config/config";

export default function hashPassWord(password: string) {
  const hashedPassWord = bcrypt.hash(password, config.SALT_ROUNDS);
  return hashedPassWord;
}
