import { NextFunction, Request, Response } from 'express';
import { signToken, verifyToken } from '../utils/jwt';
import User from '../models/UserModel';
import { LoginRequestDTO, RegisterRequestDTO } from '../requests/authRequests';
import { comparePassword, encryptPassword } from '../utils/hash';


const AuthController = {
    me: async (req: Request, res: Response) => {
        try {
            const authorization = req.headers.authorization;
            const isToken = authorization?.startsWith('Bearer');
            if (!isToken) {
                res.status(401).json({ message: "Auth.me No token was provided" })
                return
            }
            const token = authorization?.split(' ')[1] || '';

            const isVerifiedToken = await verifyToken(token);
            if (isVerifiedToken) {

                res.status(200).json({ message: "Auth.me user is authorized" })
            } else {
                res.status(401).json({ message: "Auth.me user is unauthorized" })
            }
        }
        catch (error) {
            res.status(401).json({ message: "Auth.me invalid token" });
            console.log(error);
        }
    },
    register: async (req: RegisterRequestDTO, res: Response) => {
        try {

            const { email, password, username } = req.body;
            const user = await User.findOne({ email })
            if (user) {

                res.status(409).json("Auth.register user is already registered");
                return
            }
            const passwordHash = await encryptPassword(password);
            const newUser = await User.create({ email, username, passwordHash });

            console.log(newUser);
            res.status(201).json("Auth.register - user has been created succesfully")
        } catch (error) {
            res.status(500).json("Auth.register - register failed")
        }
    },
    login: async (req: LoginRequestDTO, res: Response, next: NextFunction) => {
        try {
            const { email, username, password } = req.body;
            if (!email && !username) {
                res.status(400).json({ message: "Auth.Login Missing credentials" })
            }
            const user = await User.findOne(
                email ? { email } : { username }
            );
            if (!user) {
                res.status(400).json({ message: "Auth.login User not registered" })
                return
            }

            const isValid = await comparePassword(password, user.passwordHash);
            if (!isValid) {
                res.status(401).json({ message: "Auth.login invalid credentials" });
                return
            }
            const token = await signToken({ sub: String(user._id), email: user.email });

            res.status(200).json({ message: "Auth.login login succfully", token })

        } catch (error) {
            return next(error);
        }
    },
    logout: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({ message: "Auth.logout Logout succfully" })
        }
        catch (error) {
            next(error);
        }
    }
}

export default AuthController;