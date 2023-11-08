import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (selectedCollection) => {
  const mongoUrl = 'mongodb+srv://huangxny:sTrohg55pzkwnmO7@cluster0.s1qbuus.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(mongoUrl);
  await client.connect();
  const db = await client.db('mern-auth');
  const collection = db.collection(selectedCollection);
  return { client, collection };
};

export default connectDB;
