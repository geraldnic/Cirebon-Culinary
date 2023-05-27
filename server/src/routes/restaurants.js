import express from "express";
import { RestaurantModel } from "../models/places/Restaurant.js";

const router = express.Router();

// ADD RESTAURANT
router.post("/addrestaurant", async (req, res) => {
  const { name, imageUrl, position, foodId, price, service, taste } = req.body;
  const restaurant = await RestaurantModel.findOne({ position });
  console.log(restaurant);

  try {
    if (restaurant) {
      return res.json({
        code: 403,
        messageTitle: "Tempat kuliner sudah terdaftar!",
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
      taste,
    });

    await newRestaurant.save();

    res.json({
      code: 200,
      messageTitle: "Berhasil menambahkan tempat kuliner!",
      messageContent: "Tempat kuliner berhasil ditambahkan!",
      closeCaption: "Oke",
      link: "/admin/restaurantlist",
    });
  } catch (err) {
    console.log(err);
  }
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

//GET RESTAURANT BASED ON SELECTED FOOD
router.post("/getsomerestaurant", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.find({ foodId: req.body.foodId});
    res.json(restaurant);
  } catch (err) {
    console.log(err);
  }
});

//GET RESTAURANT BY ID
router.post("/getrestaurantbyid", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.find({ _id: req.body.id});
    res.json(restaurant);
  } catch (err) {
    console.log(err);
  }

});

//DELETE RESTAURANT
router.post("/deleterestaurant", async (req, res) => {
  await RestaurantModel.findOneAndDelete({ _id: req.body.id })
    .then(res.status(200).json({ message: "Deleted!" }))
    .catch((err) => next(err));
});

//GET CURRENT RESTAURANT
router.post("/getspecificrestaurant", async (req, res) => {
  const restaurant = await RestaurantModel.findOne({ _id: req.body.id });
  res.json(restaurant);
});

//EDIT RESTAURANT
router.put("/editrestaurant", async (req, res) => {
  await RestaurantModel.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: req.body,
    },
    { new: true }
  );
  res.json({
    code: 200,
    messageTitle: "Update Sukses!",
    messageContent: "Berhasil mengupdate tempat kuliner!",
    closeCaption: "Oke",
    link: "/admin/restaurantlist",
  });
});

export { router as restaurantRouter };
