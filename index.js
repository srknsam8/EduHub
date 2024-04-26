import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';

const app = express();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
app.use(cors());
app.use(express.json());

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URL);
    if (connection) {
      console.log('connected to mongodb');
    }
  } catch (error) {
    console.log(error);
  }
};
connectToDB();

app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
