import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {Employee} from "../models/mongodb/employee.model";
import {generateJwt} from "../helpers/jwt";

export const getEmployees = async (req: Request, res: Response) => {
    const employee = await Employee.find()
        .populate('user', 'name email img')
        .populate('office', 'name code')

    res.json({
        ok: true,
        employee
    })
}

export const createEmployee = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const employeeExists = await Employee.findOne({email});

        if (employeeExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Employee already exists'
            })
        }
        const employee = new Employee({
            ...req.body
        });
        // Encrypt password
        const salt = bcrypt.genSaltSync()
        employee.password = bcrypt.hashSync(password, salt);
        // Save employee
        await employee.save()
        // Generate token
        const token = await generateJwt(employee.id)
        res.json({
            ok: true,
            token,
            employee
        })
    } catch (error) {
        res.json({
            ok: false,
            error
        })
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    // TODO: Validate token
    const uid = req.params.id;
    const body = req.body;
    try {
        const employee = await Employee.findById(uid)
            .populate('user', 'name email img')
            .populate('office', 'name code')

        if(!employee) {
            return res.status(404).json({
                ok: false,
                msg: 'Employee not found'
            })
        }
        delete body.password;
        delete body.google;
        const employeeUpdated = await Employee.findByIdAndUpdate(uid, body, {new: true})
            .populate('user', 'name email img')
            .populate('office', 'name code')

        res.json({
            ok: true,
            employee: employeeUpdated
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

export const deleteEmployee = async (req: Request, res: Response) => {
    const uid = req.params.id;
    try {
        const employee = await Employee.findByIdAndDelete(uid);
        if(!employee) {
            return res.status(404).json({
                ok: false,
                msg: 'Employee not found'
            })
        }
        res.json({
            ok: true,
            msg: 'Employee deleted'
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

export const getEmployeeById = async (req: Request, res: Response) => {
    const uid = req.params.id;
    try {
        const employee = await Employee.findById(uid)
            .populate('user', 'name email img')
            .populate('office', 'name code')

        if (!employee) {
            return res.status(404).json({
                ok: false,
                msg: 'Employee not found'
            })
        }
        res.json({
            ok: true,
            employee
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
    const employee = await Employee.findById(uid);
    if (!employee) {
        return res.status(404).json({
            ok: false,
            msg: 'Employee not found'
        })
    }
    res.json({
        ok: true,
        employee
    })
}