/*
   Route: /api/employees
*/

import { Router} from "express";
import { check } from 'express-validator';
import { validateFields } from "../middlewares/validate-fields";
import {validateJwt} from "../middlewares/validate-jwt";
import {createEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee} from "../controllers/employees.controller";

const router = Router();

router.get('/', validateJwt, getEmployees)
router.post(
    '/',
    [
        check('name', 'the Name is required').not().isEmpty(),
        check('email', 'The Email is required').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({min: 6}),
        check('role', 'The role is required').not().isEmpty(),
        validateFields
    ],
    createEmployee)
router.put('/:id', [
    validateJwt,
    check('name', 'the Name is required').not().isEmpty(),
    check('email', 'The Email is required').isEmail(),
    check('role', 'The role is required').not().isEmpty(),
    validateFields
], updateEmployee)
router.delete('/:id', validateJwt, deleteEmployee)
router.get('/:id', validateJwt, getEmployeeById)

export default router;