import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {Office} from "../models/mongodb/office.model";
import {generateJwt} from "../helpers/jwt";

export const getOffices = async (req: Request, res: Response) => {
    const offices = await Office.find()
        .populate('user', 'name email img')

    res.json({
        ok: true,
        offices
    })
}

export const createOffice = async (req: Request, res: Response) => {
    const { code } = req.body;

    try {
        const officeExists = await Office.findOne({code})
        if (officeExists) {
            return res.status(409).json({
                ok: false,
                msg: 'Office already exists'
            })
        }
        const office = new Office(req.body);
        // Encrypt password
        const salt = bcrypt.genSaltSync()
        // office.password = bcrypt.hashSync(password, salt);
        // Save office
        await office.save()
        // Generate token
        const token = await generateJwt(office.id)
        res.json({
            ok: true,
            token,
            office
        })
    } catch (error) {
        res.json({
            ok: false,
            error
        })
    }
}

export const updateOffice = async (req: Request, res: Response) => {
    // TODO: Validate token
    const uid = req.params.id;
    const body = req.body;
    try {
        const office = await Office.findById(uid);
        if(!office) {
            return res.status(404).json({
                ok: false,
                msg: 'Office not found'
            })
        }
        delete body.password;
        delete body.google;
        const officeUpdated = await Office.findByIdAndUpdate(uid, body);
        res.json({
            ok: true,
            office: body
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

export const deleteOffice = async (req: Request, res: Response) => {
    const uid = req.params.id;
    try {
        const office = await Office.findByIdAndDelete(uid);
        if(!office) {
            return res.status(404).json({
                ok: false,
                msg: 'Office not found'
            })
        }
        res.json({
            ok: true,
            msg: 'Office deleted'
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

export const getOfficeById = async (req: Request, res: Response) => {
    console.log('req-> ', req)
    const uid = req.params.id;

    try {
        const office = await Office.findById(uid)
            .populate('user', 'name email img')

        if (!office) {
            return res.status(404).json({
                ok: false,
                msg: 'Office not found'
            })
        }
        res.json({
            ok: true,
            office
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}