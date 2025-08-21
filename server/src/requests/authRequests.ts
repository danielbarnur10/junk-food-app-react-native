import { Request } from "express";

export interface UserDTO {
  email: string;
  password: string;
  username: string;
}

export interface RegisterRequestDTO extends Request {
  body: UserDTO;
}
export interface LoginRequestDTO extends Request {
  body: UserDTO;
}