import { Schema, model, Types, Document } from "mongoose";

type CartItem = {
  productId: Types.ObjectId;
  qty: number;
};

export interface CartDoc extends Document {
  userId: Types.ObjectId;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<CartItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    qty: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const cartSchema = new Schema<CartDoc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true }
);

export const Cart = model<CartDoc>("Cart", cartSchema);
