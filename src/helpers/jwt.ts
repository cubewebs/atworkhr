import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function generateJwt(uid: string): Promise<string> {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable not set');
    }

    const payload = { uid };
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            secret,
            { expiresIn: '24h' },
            (error, token) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token!);
                }
            }
        );
    });
}

export { generateJwt };