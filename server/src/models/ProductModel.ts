import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    description?: string;
    title: string;
    price: number;
    image?: string;
    isAvailable?: boolean;
    createdAt: string;
    updatedAt: string;

}

const productSchema = new Schema<IProduct>({
    description: { type: String, required: false },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    isAvailable: { type: Boolean, required: false },

}, {
    timestamps: true,
})

export default mongoose.model<IProduct>("Product", productSchema);
