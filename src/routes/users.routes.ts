/*
   Route: /api/users
*/

import { Router} from "express";
import { check } from 'express-validator';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/users.controller";
import { validateFields } from "../middlewares/validate-fields";
import {validateJwt} from "../middlewares/validate-jwt";

const router = Router();

router.get('/', validateJwt, getUsers)
router.post(
    '/',
    [
        check('name', 'the Name is required').not().isEmpty(),
        check('email', 'The Email is required').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({min: 6}),
        check('role', 'The role is required').not().isEmpty(),
        validateFields
        ],
    createUser)
router.put('/:id', [
    validateJwt,
    check('name', 'the Name is required').not().isEmpty(),
    check('email', 'The Email is required').isEmail(),
    check('role', 'The role is required').not().isEmpty(),
    validateFields
], updateUser)
router.delete('/:id', validateJwt, deleteUser)
router.get('/:id', validateJwt, getUserById)

export default router;