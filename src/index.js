import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {dbConnection} from './db/config.js';

// mongodb+srv://satixfaxion:<password>@cluster0.54w1i.mongodb.net/
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Database
dbConnection();
// Parse and read body
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: `Hello World!!`
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on port http://localhost:3000`);
});