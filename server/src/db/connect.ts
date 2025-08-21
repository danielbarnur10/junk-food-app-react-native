import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const URI = process.env.MONGODB_URI;
const connectMongoDB = () => {
    if (!URI) { throw new Error(`No URI is provided ${URI}`) };
    const conn = mongoose.connect(URI);
    conn.then(() => { console.log("connected to mongoDB ") })
        .catch((error) => {
            console.error("MongoDB connection error:", error);
        });
}
export default connectMongoDB;