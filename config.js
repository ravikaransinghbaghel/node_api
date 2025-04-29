import mongoose from 'mongoose';

export const connect =async()=>{
const dbUrl = process.env.RAIL_MONGO_URL;
const connection = await mongoose.connect(dbUrl);
console.log(`connect is ${connection.connection.host}`);

}