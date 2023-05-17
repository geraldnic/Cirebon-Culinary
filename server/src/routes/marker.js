import express from "express";
import { MarkerModel } from "../models/places/Marker.js";

const router = express.Router();

router.post("/addmarker", async (req, res) => {
  const { name, position } = req.body;
  const marker = await MarkerModel.findOne({ position });
  console.log(marker);

  if (marker) {
    return res.json({
      code: 403,
      messageTitle: "Tempat sudah terdaftar!",
      messageContent: "Silahkan coba masukkan posisi yang lain!",
      closeCaption: "Coba Lagi",
      link: "/admin/touristattractionlist/add",
    });
  }

  const newMarker = new MarkerModel({
    name,
    position,
  });

  await newMarker.save();

  res.json({
    code: 200,
    messageTitle: "Berhasil menambahkan titik!",
    messageContent: "Tempat wisata berhasil ditambahkan!",
    closeCaption: "Oke",
    link: "/admin/touristattractionlist",
  });
});

router.get("/getmarker", async (req, res) => {
  const markers = await MarkerModel.find({});
  res.json(markers);
});

router.post("/getspecificmarker", async (req, res) => {
  const markers = await MarkerModel.findOne({ _id: req.body.id });
  res.json(markers);
});

router.post("/deletemarker", async (req, res) => {
  await MarkerModel.findOneAndDelete({ _id: req.body.id })
    .then(res.status(200).json({ message: "Deleted!" }))
    .catch((err) => next(err));
});

router.put("/editmarker", async (req, res) => {
  await MarkerModel.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: req.body,
    },
    { new: true }
  );
  res.json({
    code: 200,
    messageTitle: "Update Sukses!",
    messageContent: "Berhasil mengupdate tempat wisata!",
    closeCaption: "Oke",
    link: "/admin/touristattractionlist",
  });
});

export { router as markerRouter };
