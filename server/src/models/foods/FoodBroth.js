import mongoose from "mongoose";

const BrothSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ingredientId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodIngredient"
  }]
});

export const FoodBrothModel = mongoose.model("foodBroths", BrothSchema);
