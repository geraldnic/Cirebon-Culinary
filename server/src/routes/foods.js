import express from "express";
import { FoodModel } from "../models/foods/Food.js";
import { FoodTypeModel } from "../models/foods/FoodType.js";
import { FoodIngredientModel } from "../models/foods/FoodIngredient.js";
import { FoodBrothModel } from "../models/foods/FoodBroth.js";
import { FoodServingModel } from "../models/foods/FoodServing.js";

const router = express.Router();

// ADD FOOD
router.post("/addfood", async (req, res) => {
  const {
    name,
    description,
    imageUrl,
    typeId,
    ingredientId,
    brothId,
    servingId,
  } = req.body;
  const food = await FoodModel.findOne({ name });

  if (food) {
    return res.json({
      code: 403,
      messageTitle: "Menu makanan sudah terdaftar!",
    });
  }

  const newFood = new FoodModel({
    name,
    description,
    imageUrl,
    typeId,
    ingredientId,
    brothId,
    servingId,
  });

  await newFood.save();

  res.json({
    code: 200,
    messageTitle: "Berhasil!",
    messageContent: "Menu makanan telah ditambahkan",
    closeCaption: "Oke",
    link: "/admin/foodlist",
  });
});

// ADD FOOD TYPE
router.post("/addtype", async (req, res) => {
  const { name, description, imageUrl } = req.body;
  const type = await FoodTypeModel.findOne({ name });

  if (type) {
    return res.json({
      code: 403,
      messageTitle: "Tipe makanan sudah terdaftar!",
    });
  }

  const newType = new FoodTypeModel({
    name,
    description,
    imageUrl,
  });

  await newType.save();

  res.json({
    code: 200,
    messageTitle: "Berhasil menambahkan tipe makanan!",
  });
});

// ADD FOOD INGREDIENT
router.post("/addingredient", async (req, res) => {
  const { name, description, imageUrl, typeId } = req.body;
  const ingredient = await FoodIngredientModel.findOne({ name });

  if (ingredient) {
    return res.json({
      code: 403,
      messageTitle: "Gagal!",
      messageContent: "Bahan utama sudah terdaftar!",
      closeCaption: "Oke",
      link: "/admin/foodlist/add",
      success: false
    });
  }

  const newIngredient = new FoodIngredientModel({
    name,
    description,
    imageUrl,
    typeId,
  });

  await newIngredient.save();

  res.json({
    code: 200,
    messageTitle: "Berhasil!",
    messageContent: "Bahan utama berhasil ditambahkan!",
    closeCaption: "Oke",
    link: "/admin/foodlist/add",
    success: true
  });
});

// ADD FOOD BROTH
router.post("/addbroth", async (req, res) => {
  const { name, description, imageUrl, ingredientId } = req.body;
  const broth = await FoodBrothModel.findOne({ name });

  if (broth) {
    return res.json({
      code: 403,
      messageTitle: "Keberkuahan sudah terdaftar!",
    });
  }

  const newBroth = new FoodBrothModel({
    name,
    description,
    imageUrl,
    ingredientId,
  });

  await newBroth.save();

  res.json({
    code: 200,
    messageTitle: "Berhasil menambahkan keberkuahan!",
  });
});

// ADD FOOD SERVING
router.post("/addserving", async (req, res) => {
  const { name, description, imageUrl, ingredientId, brothId } = req.body;
  const serving = await FoodServingModel.findOne({ name });

  if (serving) {
    return res.json({
      code: 403,
      messageTitle: "Gagal!",
      messageContent: "Penyajian telah terdaftar!",
      closeCaption: "Oke",
      link: "/admin/foodlist/add",
      success: false
    });
  }

  const newServing = new FoodServingModel({
    name,
    description,
    imageUrl,
    ingredientId,
    brothId,
  });

  await newServing.save();

  res.json({
    code: 200,
    messageTitle: "Berhasil!",
    messageContent: "Penyajian berhasil ditambahkan",
    closeCaption: "Oke",
    link: "/admin/foodlist/add",
    success: true
  });
});

// GET FOOD
router.get("/getfood", async (req, res) => {
  try {
    const food = await FoodModel.find({});
    res.json(food);
  } catch (err) {
    console.log(err);
  }
});

// GET CURRENT FOOD
router.post("/getcurrfood", async (req, res) => {
  try {
    const currFood = await FoodModel.findOne({ _id: req.body.id});
    res.json(currFood);
  } catch (err) {
    console.log(err);
  }
});

// GET FOOD RESULT
router.post("/getfoodresult", async (req, res) => {
  try {
    const food = await FoodModel.find({
      typeId: req.body.typeId,
      ingredientId: req.body.ingredientId,
      brothId: req.body.brothId,
      servingId: req.body.servingId
    });
    res.json(food);
  } catch (err) {
    console.log(err);
  }
});

// GET FOOD TYPE
router.get("/gettype", async (req, res) => {
  try {
    const type = await FoodTypeModel.find({});
    res.json(type);
  } catch (err) {
    console.log(err);
  }
});

// GET ALL INGREDIENT
router.get("/getallingredient", async (req, res) => {
  try {
    const ingredient = await FoodIngredientModel.find({});
    res.json(ingredient);
  } catch (err) {
    console.log(err);
  }
});

// GET ALL BROTH
router.get("/getallbroth", async (req, res) => {
  try {
    const broth = await FoodBrothModel.find({});
    res.json(broth);
  } catch (err) {
    console.log(err);
  }
});

// GET ALL SERVING
router.get("/getallserving", async (req, res) => {
  try {
    const serving = await FoodServingModel.find({});
    res.json(serving);
  } catch (err) {
    console.log(err);
  }
});

// GET SPECIFIC FOOD INGREDIENT BY ID
router.post("/getingredient", async (req, res) => {
  try {
    const ingredient = await FoodIngredientModel.find({
      typeId: req.body.typeId,
    });
    res.json(ingredient);
  } catch (err) {
    console.log(err);
  }
});

// GET SPECIFIC FOOD INGREDIENT BY NAME
router.post("/getingredientname", async (req, res) => {
  try {
    const ingredient = await FoodIngredientModel.findOne({
      name: req.body.name,
    });
    res.json(ingredient);
  } catch (err) {
    console.log(err);
  }
});

// GET SPECIFIC FOOD BROTH
router.post("/getbroth", async (req, res) => {
  try {
    const broth = await FoodBrothModel.find({
      ingredientId: req.body.ingredientId,
    });
    res.json(broth);
  } catch (err) {
    console.log(err);
  }
});

// GET SPECIFIC FOOD SERVING
router.post("/getserving", async (req, res) => {
  try {
    const serving = await FoodServingModel.find({
      ingredientId: req.body.ingredientId,
      brothId: req.body.brothId,
    });
    res.json(serving);
  } catch (err) {
    console.log(err);
  }
});

// EDIT FOOD
router.put("/editfood", async (req, res) => {
  await FoodModel.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: req.body,
    },
    { new: true }
  );
  res.json({
    code: 200,
    messageTitle: "Update Sukses!",
    messageContent: "Berhasil mengupdate menu makanan!",
    closeCaption: "Oke",
    link: "/admin/foodlist",
  });
});

// DELETE FOOD
router.post("/deletefood", async (req, res) => {
  await FoodModel.findOneAndDelete({ _id: req.body.id })
    .then(res.status(200).json({ message: "Deleted!" }))
    .catch((err) => next(err));
});

export { router as foodsRouter };
