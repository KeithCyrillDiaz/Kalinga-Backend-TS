import crypto from 'crypto'
import dotenv from 'dotenv';

dotenv.config()

const secret = process.env.SECRET_KEY
console.log("secret: ", secret)
export const random = () => crypto.randomBytes(128).toString("base64");
export const passEncryption = (salt: string, password: string) => {
    return crypto.createHmac("sha256", [salt, password].join('/')).update(secret).digest("hex");
}