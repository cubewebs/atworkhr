import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token not found'
        });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET || 'Hs@34lsle0skj34qQ2DfewWopxsd372%d3&43dfG');
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        });
    }
}