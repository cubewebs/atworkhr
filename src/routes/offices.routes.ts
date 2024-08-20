/*
   Route: /api/offices
*/

import { Router} from "express";
import { check } from 'express-validator';
import { validateFields } from "../middlewares/validate-fields";
import {
    createOffice,
    deleteOffice,
    getOfficeById,
    getOffices,
    updateOffice
} from "../controllers/offices.controller";

const router = Router();

router.get('/', getOffices)
router.post(
    '/',
    [
        check('name', 'the Name is required').not().isEmpty(),
        validateFields
    ],
    createOffice)
router.put('/:id', [
    check('name', 'the Name is required').not().isEmpty(),
    validateFields
], updateOffice)
router.delete('/:id', deleteOffice)
router.get('/:id', getOfficeById)

export default router;