"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const config_1 = require("./db/config");
class Server {
    constructor() {
        this.PORT = process.env.PORT || 3000;
        this.app = (0, express_1.default)();
        this.listen();
        this.middlewares();
        this.PORT = process.env.PORT || 3000;
        this.routes();
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
}
exports.default = Server;
(0, config_1.dbConnection)();
