import { Schema, Document } from 'mongoose';

export interface Pin extends Document {
  imageUrl: string;
  description: string;
  tags: string[];
  likes: string[]; 
  owner: string; 
}

export const PinSchema = new Schema({
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
