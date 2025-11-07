import mongoose, { Schema, Document } from 'mongoose';

export interface IProductModel extends Document {
  name: string;
price: number;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
    price: {
    type: Number,
    required: true,
    },
}, {
  timestamps: true,
});

export const ProductModel = mongoose.model<IProductModel>('Product', ProductSchema);