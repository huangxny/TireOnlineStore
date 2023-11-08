import connectDB from "./connectDB.js";
import {ObjectId} from 'mongodb';

function userDb() {
  const me = {};
  me.register = async (user) => {
    const {client, collection} = await connectDB('user');
    const res = await collection.insertOne({email: user.email, password: user.hashedPassword, cart: []});
    try {
      return res;
    } finally {
      await client.close();
    }
  }

  me.getUserByID = async (id) => {
    const {client, collection} = await connectDB('user');
    const res = await collection.findOne({_id: new ObjectId(id)});
    try {
      return res;
    } finally {
      await client.close();
    }
  }

  me.getUserByEmail = async (email) => {
    const {client, collection} = await connectDB('user');
    const res = await collection.findOne({email: email});
    try {
      return res;
    } finally {
      await client.close();
    }
  }
  return me;
}

export const userDB = userDb();

