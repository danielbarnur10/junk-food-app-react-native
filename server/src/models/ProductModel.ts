import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    price: string;
    description: string;

    createdAt: string;
    updatedAt: string;

}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },

}, {
    timestamps: true,
})

export default mongoose.model<IProduct>("Product", productSchema);
