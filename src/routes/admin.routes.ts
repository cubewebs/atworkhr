/*
   Route: /api/admin
*/

import { Router} from "express";
import { check } from 'express-validator';
import { validateFields } from "../middlewares/validate-fields";
import {validateJwt} from "../middlewares/validate-jwt";
import {createAdmin, deleteAdmin, getAdminById, getAdmins, updateAdmin} from "../controllers/admin.controller";

const router = Router();

router.get('/', validateJwt, getAdmins)
router.post(
    '/',
    [
        check('name', 'the Name is required').not().isEmpty(),
        check('email', 'The Email is required').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({min: 6}),
        check('role', 'The role is required').not().isEmpty(),
        validateFields
    ],
    createAdmin)
router.put('/:id', [
    validateJwt,
    check('name', 'the Name is required').not().isEmpty(),
    check('email', 'The Email is required').isEmail(),
    check('role', 'The role is required').not().isEmpty(),
    validateFields
], updateAdmin)
router.delete('/:id', validateJwt, deleteAdmin)
router.get('/:id', validateJwt, getAdminById)

export default router;