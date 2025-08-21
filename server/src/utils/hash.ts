
import bcrypt from 'bcryptjs';


export const encryptPassword = async (password: string) :Promise<String>=> {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash.toString();
}


export const comparePassword = async (password: string, passwordHash: string): Promise<Boolean> => {
    const isvalid = await bcrypt.compare(password, passwordHash);
    return isvalid;
}