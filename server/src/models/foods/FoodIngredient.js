import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  typeId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodType"
  }]
});

export const FoodIngredientModel = mongoose.model("foodIngredients", IngredientSchema);
