import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {User} from "../models/mongodb/user.model";
import {generateJwt} from "../helpers/jwt";

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find();

    res.json({
        ok: true,
        users
    })
}

export const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log('req.body-> ', req.body)
    try {
        const userExists = await User.findOne({email})
        if (userExists) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            })
        }
        const user = new User(req.body);
        // Encrypt password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt);
        // Save user
        await user.save()
        // Generate token
        const token = await generateJwt(user.id)
        res.json({
            ok: true,
            token,
            user
        })
    } catch (error) {
        res.json({
            ok: false,
            error
        })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    // TODO: Validate token
    const uid = req.params.id;
    const body = req.body;
    try {
        const user = await User.findById(uid);
        if(!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }
        if(body.password) {
            const salt = bcrypt.genSaltSync()
            body.password = bcrypt.hashSync(body.password, salt);
        }
        delete body.google;
        const userUpdated = await User.findByIdAndUpdate(uid, body, { new: true });
        res.json({
            ok: true,
            user: userUpdated
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const uid = req.params.id;
    try {
        const user = await User.findByIdAndDelete(uid);
        if(!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }
        res.json({
            ok: true,
            msg: 'User deleted'
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const uid = req.params.id;
    try {
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }
        res.json({
            ok: true,
            user
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
    const user = await User.findById(uid);
    if (!user) {
        return res.status(404).json({
            ok: false,
            msg: 'User not found'
        })
    }
    res.json({
        ok: true,
        user
    })
}