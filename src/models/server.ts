import 'dotenv/config';
import express, {Application} from 'express';
import cors from 'cors';
import {dbConnection} from '../db/config';
import usersRoutes from '../routes/users.routes';
import authRoutes from '../routes/auth.routes';

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
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnection() {
        try {
            await dbConnection();
            console.log('Database online');
        } catch (error) {
            console.log(error);
            throw new Error('Error a la hora de inicializar la base de datos');
        }
    }
}


