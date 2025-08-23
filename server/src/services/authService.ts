import { verifyToken } from "../utils/jwt";

const authService = {
    authenticateToken:
        async (authorization: string) => {
            const isToken = authorization?.startsWith('Bearer');
            if (!isToken) {
                throw new Error("authService.authenticateToken No token was provided");
            }
            const token = authorization?.split(' ')[1] || '';

            const isVerifiedToken = await verifyToken(token);
            return isVerifiedToken;
        }
}

export default authService;