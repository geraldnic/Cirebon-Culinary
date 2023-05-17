import mongoose from "mongoose";

const TypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

export const FoodTypeModel = mongoose.model("foodTypes", TypeSchema);
