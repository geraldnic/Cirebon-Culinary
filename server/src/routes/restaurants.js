import express from "express";
import { RestaurantModel } from "../models/places/Restaurant.js";

const router = express.Router();

// ADD RESTAURANT
router.post("/addrestaurant", async (req, res) => {
    const { name, imageUrl, position, foodId, price, service, taste } = req.body;
    const restaurant = await RestaurantModel.findOne({ position });
    console.log(restaurant);
  
    if (restaurant) {
      return res.json({
        code: 403,
        messageTitle: "Restaurant sudah terdaftar!",
        messageContent: "Silahkan coba masukkan posisi yang lain!",
        closeCaption: "Coba Lagi",
        link: "/admin/restaurantlist/add",
      });
    }
  
    const newRestaurant = new RestaurantModel({
      name,
      imageUrl,
      position,
      foodId,
      price,
      service,
      taste
    });
  
    await newRestaurant.save();
  
    res.json({
      code: 200,
      messageTitle: "Berhasil menambahkan tempat kuliner!",
      messageContent: "Tempat kuliner berhasil ditambahkan!",
      closeCaption: "Oke",
      link: "/admin/restaurantlist",
    });
  });

  //GET RESTAURANT
  router.get("/getrestaurant", async (req, res) => {
    try {
      const restaurant = await RestaurantModel.find({});
      res.json(restaurant);
    } catch (err) {
      console.log(err);
    }
  });

export { router as restaurantRouter };