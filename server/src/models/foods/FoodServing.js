import mongoose from "mongoose";

const ServingSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ingredientId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodIngredient"
  }],
  brothId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodBroth"
  }]
});

export const FoodServingModel = mongoose.model("foodServings", ServingSchema);
