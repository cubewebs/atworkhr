import mongoose from 'mongoose';

const MONGO_DB = process.env.MONGO_DB || 'mongodb+srv://satixfaxion:Zeus9800@cluster0.54w1i.mongodb.net/hospitals';

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