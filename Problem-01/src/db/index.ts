import mongoose from 'mongoose';

const host = 'localhost';
const name = 'local';
const port = 27017;

mongoose.connect(`mongodb://${host}:${port}/${name}`, { useNewUrlParser: true });

export const db = mongoose.connection;
