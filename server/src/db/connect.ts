import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const URI = process.env.MONGODB_URI;
console.log(URI)
const connectMongoDB = () => {
  if (!URI) throw new Error("MONGODB_URI is not set");
  mongoose.connect(URI)
    .then(() => console.log("✅ connected to MongoDB"))
    .catch((err) => { console.error("❌ Mongo error:", err); throw err; });
};
export default connectMongoDB;