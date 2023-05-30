import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/auth/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({
      code: 403,
      messageTitle: "Username telah digunakan!",
      messageContent: "Silahkan coba masukkan username lain",
      closeCaption: "Coba Lagi",
      link: "/auth?mode=signup",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
    firstName,
    lastName,
  });
  await newUser.save();

  res.json({
    code: 200,
    messageTitle: "Akun berhasil dibuat!",
    messageContent: "Sekarang kamu bisa masuk pakai akun barumu",
    closeCaption: "Login",
    link: "/auth?mode=signin",
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({
      messageTitle: "User tidak terdaftar!",
      code: 403,
      messageContent: "Username yang kamu masukkin salah atau belum terdaftar",
      closeCaption: "Coba lagi",
      link: "/auth?mode=signin",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({
      messageTitle: "Password Salah!",
      code: 403,
      messageContent: "Coba diingat-ingat lagi deh",
      closeCaption: "Coba lagi",
      link: "/auth?mode=signin",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET);
  res.json({ token, username: user.username, code: 200 });
});

router.put("/changepassword", async (req, res) => {
  const { username, currPassword, newPassword } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({
      messageTitle: "User tidak terdaftar!",
      code: 403,
      messageContent: "Username yang kamu masukkin salah atau belum terdaftar",
      closeCaption: "Coba lagi",
      link: "/admin/userlist",
    });
  }

  const isPasswordValid = await bcrypt.compare(currPassword, user.password);

  if (!isPasswordValid) {
    return res.json({
      messageTitle: "Password Salah!",
      code: 403,
      messageContent: "Coba diingat-ingat lagi deh",
      closeCaption: "Coba lagi",
      link: "/admin/userlist",
    });
  }

  if (currPassword == newPassword) {
    return res.json({
      messageTitle: "Password Tidak Boleh Sama!",
      code: 403,
      messageContent: "Silahkan masukkan password baru yang berbeda.",
      closeCaption: "Coba lagi",
      link: "/admin/userlist",
    });
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await UserModel.findOneAndUpdate(
    { username },
    {
      password: hashedNewPassword,
    },
    { new: true }
  );
  res.json({
    code: 200,
    messageTitle: "Sukses!",
    messageContent: "Password Berhasil diubah!",
    closeCaption: "Oke",
    link: "/admin",
  });
});

export { router as userRouter };
