import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    console.log('Conectando ao MongoDB...')
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dbhexagonal';
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Conectado.');
  } catch (error: any) {
    console.error(`Erro ao conectar no MongoDB: ${error.message}`);
    process.exit(1);
  }
};