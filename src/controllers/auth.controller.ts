import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {User} from "../models/mongodb/user.model";
import {generateJwt} from "../helpers/jwt";

/**
 * Endpoint para el login de usuarios.
 * Busca al usuario por email y verifica la contraseña.
 * Si es válida, devuelve el usuario.
 *
 * @param req - Request con el email y la contraseña del usuario.
 * @param res - Response con el usuario si la contraseña es válida.
 */
export const login = async (req: Request, res: Response) => {
    // Extraer email y contraseña del request
    const {email, password} = req.body;

    try {
        // Buscar usuario por email
        const user = await User.findOne({email});

        // Si no existe, devuelve error
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User not found'
            })
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, user.password);
        // Si la contraseña es inválida, devuelve error
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            })
        }

        // Si la contraseña es válida, crea el token
        const token = await generateJwt(user.id)

        // Si la contraseña es válida, devuelve el usuario
        res.json({
            ok: true,
            token,
            role: user.role
        })

    } catch (error) {
        // Si ocurre algún error, devuelve el error
        res.status(500).json({
            ok: false,
            error
        })
    }
}

