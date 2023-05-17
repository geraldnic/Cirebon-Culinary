import mongoose from "mongoose";

const MarkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
  }
});

export const MarkerModel = mongoose.model("markers", MarkerSchema);
