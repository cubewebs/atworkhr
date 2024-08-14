"use strict";
/*
   Route: /api/users
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
router.get('/', users_controller_1.getUsers);
router.post('/', users_controller_1.createUser);
router.patch('/:id', users_controller_1.updateUser);
router.delete('/:id', users_controller_1.deleteUser);
router.get('/:id', users_controller_1.getUserById);
exports.default = router;
