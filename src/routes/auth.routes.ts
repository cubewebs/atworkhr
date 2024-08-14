/*
   Route: /api/auth
*/

import { Router} from "express";
import { check } from 'express-validator';
import {login} from "../controllers/auth.controller";
import {validateFields} from "../middlewares/validate-fields";

const router = Router();

router.post('/login', [
    check('email', 'The Email is required').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({min: 6}),
    validateFields
], login);

export default router;