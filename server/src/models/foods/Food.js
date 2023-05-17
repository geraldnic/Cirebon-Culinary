import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodType"
  },
  ingredientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodIngredient"
  },
  brothId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodBroth"
  },
  servingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodServing"
  }
});

export const FoodModel = mongoose.model("foods", FoodSchema);
