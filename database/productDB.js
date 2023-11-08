import connectDB from "./connectDB.js";
import {ObjectId} from 'mongodb';

function productDb() {
  const me = {};
  me.insertOne = async (tire) => {
    const {client, collection} = await connectDB('product');
    try {
      return await collection.insertOne(tire);
    } finally {
      await client.close();
    }
  };

  me.getAllProduct = async (query) => {
    const {client, collection} = await connectDB('product');
    try {
      return await collection.find(query).toArray();
    } finally {
      await client.close();
    }
  };
 me.getProductById = async (id) => {
    const {client, collection} = await connectDB('product');
    try {
      return await collection.findOne({_id: new ObjectId(id)});
    } finally {
      await client.close();
    }
  }
  me.deleteOne = async (id) => {
    const {client, collection} = await connectDB('product');
    try {
      return await collection.deleteOne({_id: new ObjectId(id)});
    } finally {
      await client.close();
    }
  };
  return me;
}

export const productDB = productDb();

