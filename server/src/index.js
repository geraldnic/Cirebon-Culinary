import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/users.js";
import { markerRouter } from "./routes/marker.js";
import { foodsRouter } from "./routes/foods.js";
import { restaurantRouter } from "./routes/restaurants.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/marker", markerRouter);
app.use("/food", foodsRouter);
app.use("/restaurant", restaurantRouter);

mongoose.connect(
  process.env.MONGODB_URI
);

app.listen(3001 || process.env.PORT, () => console.log("SERVER STARTED!"));
