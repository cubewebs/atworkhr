/*
   Route: /api/offices
*/

import { Router} from "express";
import { check } from 'express-validator';
import { validateFields } from "../middlewares/validate-fields";
import {validateJwt} from "../middlewares/validate-jwt";
import {
    createOffice,
    deleteOffice,
    getOfficeById,
    getOffices,
    updateOffice
} from "../controllers/offices.controller";

const router = Router();

router.get('/:id', validateJwt, getOfficeById)
router.get('/', validateJwt, getOffices)
router.delete('/:id', validateJwt, deleteOffice)
router.post(
    '/',
    [
        validateJwt,
        check('name', 'The Name is required').not().isEmpty(),
        check('code', 'The Code is required').not().isMongoId(),
        validateFields
    ],
    createOffice)
router.put('/:id', [
    validateJwt,
    check('name', 'The Name is required').not().isEmpty(),
    check('code', 'The Code is required').isMongoId(),
    validateFields
], updateOffice)

export default router;