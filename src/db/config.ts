import mongoose from 'mongoose';

const MONGO_DB = process.env.DB_CNN || 'mongodb+srv://juanjoseaos:Zeus9800@clusterjuanjo0.xkmkhr7.mongodb.net/atworkhr_db';

const dbConnection = async () => {
    try {
        await mongoose.connect(MONGO_DB);
        console.log('Database online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la base de datos');
    }
};

export { dbConnection };