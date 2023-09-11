import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import serviceAccount from './pomopets-app-firebase-adminsdk-kx6i1-b086523933.json' assert { type: 'json' };

import userRoutes from './routes/userRoutes.mjs';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const port = process.env.PORT || 5050;
const uri = process.env.ATLAS_URI || '';
const app = express();

const connOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME,
};

mongoose.connect(uri, connOptions);

const db = mongoose.connection;
db.on('error', (error) => {
  console.error(error);
});
db.once('connected', () => {
  console.log('Server is connected to MongoDB');
});

app.use(cors({ origin: true, credentials: true}));
app.use(express.json());

//routes
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
