"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const users_model_1 = require("../models/mongodb/users.model");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.User.find();
    res.json({
        ok: true,
        users
    });
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new users_model_1.User(req.body);
    yield user.save();
    res.json({
        ok: true,
        user
    });
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.id;
    const body = req.body;
    const user = yield users_model_1.User.findByIdAndUpdate(uid, body, { new: true });
    res.json({
        ok: true,
        user
    });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.id;
    const user = yield users_model_1.User.findByIdAndDelete(uid);
    res.json({
        ok: true,
        user
    });
});
exports.deleteUser = deleteUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.id;
    const user = yield users_model_1.User.findById(uid);
    res.json({
        ok: true,
        user
    });
});
exports.getUserById = getUserById;
