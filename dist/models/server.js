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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_routes_1 = __importDefault(require("../routes/users.routes"));
const config_1 = require("../db/config");
class Server {
    constructor() {
        this.PORT = process.env.PORT || 3000;
        this.app = (0, express_1.default)();
        this.middlewares();
        this.PORT = process.env.PORT || 3000;
        this.routes();
        this.dbConnection();
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        });
    }
    routes() {
        this.app.use('/api/users', users_routes_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, config_1.dbConnection)();
                console.log('Database online');
            }
            catch (error) {
                console.log(error);
                throw new Error('Error a la hora de inicializar la base de datos');
            }
        });
    }
}
exports.default = Server;
