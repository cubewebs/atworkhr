import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {Admin} from "../models/mongodb/admin.model";
import {generateJwt} from "../helpers/jwt";

export const getAdmins = async (req: Request, res: Response) => {
    const admins = await Admin.find();

    res.json({
        ok: true,
        admins
    })
}

export const createAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const adminExists = await Admin.findOne({email})
        if (adminExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Admin already exists'
            })
        }
        const admin = new Admin(req.body);
        // Encrypt password
        const salt = bcrypt.genSaltSync()
        admin.password = bcrypt.hashSync(password, salt);
        // Save admin
        await admin.save()
        // Generate token
        const token = await generateJwt(admin.id)
        res.json({
            ok: true,
            token,
            admin
        })
    } catch (error) {
        res.json({
            ok: false,
            error
        })
    }
}

export const updateAdmin = async (req: Request, res: Response) => {
    // TODO: Validate token
    const uid = req.params.id;
    const body = req.body;
    try {
        const admin = await Admin.findById(uid);
        if(!admin) {
            return res.status(404).json({
                ok: false,
                msg: 'Admin not found'
            })
        }
        delete body.password;
        delete body.google;
        const adminUpdated = await Admin.findByIdAndUpdate(uid, body);
        res.json({
            ok: true,
            admin: body
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

export const deleteAdmin = async (req: Request, res: Response) => {
    const uid = req.params.id;
    try {
        const admin = await Admin.findByIdAndDelete(uid);
        if(!admin) {
            return res.status(404).json({
                ok: false,
                msg: 'Admin not found'
            })
        }
        res.json({
            ok: true,
            msg: 'Admin deleted'
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

export const getAdminById = async (req: Request, res: Response) => {
    const uid = req.params.id;
    try {
        const admin = await Admin.findById(uid);
        if (!admin) {
            return res.status(404).json({
                ok: false,
                msg: 'Admin not found'
            })
        }
        res.json({
            ok: true,
            admin
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
    const admin = await Admin.findById(uid);
    if (!admin) {
        return res.status(404).json({
            ok: false,
            msg: 'Admin not found'
        })
    }
    res.json({
        ok: true,
        admin
    })
}