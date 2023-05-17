import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  position: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
  },
  foodId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "food"
  }],
  price: { type: Number, required: true},
  service: { type: Number, required: true},
  taste: { type: Number, required: true},
});

export const RestaurantModel = mongoose.model("restaurants", RestaurantSchema);
