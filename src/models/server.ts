import 'dotenv/config';
import express, {Application} from 'express';
import cors from 'cors';
import {dbConnection} from '../db/config';
import usersRoutes from '../routes/users.routes';
import authRoutes from '../routes/auth.routes';
import adminRoutes from "../routes/admin.routes";
import employeesRoutes from "../routes/employees.routes";
import officesRoutes from "../routes/offices.routes";

export default class Server {
    private app: Application;
    private readonly PORT = process.env.PORT || 3000;

    constructor() {
        this.app = express();
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
        this.app.use('/api/users', usersRoutes);
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/admin', adminRoutes);
        this.app.use('/api/offices', officesRoutes);
        this.app.use('/api/employees', employeesRoutes);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnection() {
        try {
            await dbConnection();
        } catch (error) {
            console.log(error);
            throw new Error('Error a la hora de inicializar la base de datos');
        }
    }
}


