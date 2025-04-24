import mongoose from 'mongoose';

export const connect =async()=>{
const dbUrl = process.env.dbUrl;
const connection = await mongoose.connect(dbUrl);
console.log(`connect is ${connection.connection.host}`);

}