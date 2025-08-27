import { Schema, model, Types, Document } from "mongoose";

type OrderItem = {
  productId: Types.ObjectId;
  qty: number;
  priceAtPurchase: number;
};

export interface OrderDoc extends Document {
  userId: Types.ObjectId;
  items: OrderItem[];
  total: number;
  status: "placed" | "paid" | "shipped" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<OrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    qty: { type: Number, required: true, min: 1 },
    priceAtPurchase: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new Schema<OrderDoc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: { type: [orderItemSchema], default: [] },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["placed", "paid", "shipped", "cancelled"],
      default: "placed",
    },
  },
  { timestamps: true }
);

export const Order = model<OrderDoc>("Order", orderSchema);
