// const { body, param, validationResult } = require("express-validator");
const { SpareParts, SparePartsSend } = require("../models/models");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../config/jwt");
// const { OAuth2Client } = require("google-auth-library");
// const fs = require("fs");
// const path = require("path");
// const directoryPath = path.join(__dirname, "../uploads");

class SparePartsController {
  async add(req, res) {
    try {
      

      const { number, description, photo, nameSpareParts, price } = req.body;

      const newSpareParts = await SpareParts.create({
        number: number,
        description: description,
        photo: photo,
        nameSpareParts: nameSpareParts,
        price: price,
      });

      console.log("Запчастина успішно доданно в базу даних");
      res.status(201).json(newSpareParts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Помилка створення запчастин" });
    }
  }

  async getAllnewSpareParts(req, res) {
    try {
      const spareParts = await SpareParts.findAll();
      res.json(spareParts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Помилка отримання запчастин" });
    }
  }

  async buySpareParts(req, res) {
    try {
      const { nameClient, numberPhoneClient, message, count, deviceId } = req.body;

      console.log(req.body);

      const servicesSend = await SparePartsSend.create({
        number: count,
        nameClient: nameClient,
        message: message,
        device_id: deviceId, 
        numberPhoneClient: numberPhoneClient,
      });

      console.log("Запит на послугу надіслано");
      res.status(201).json({
        message: "Запит на послугу надіслано",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Помилка створення запиту" });
  }
}

//   async getUserById(req, res) {
//     try {
//       const userId = req.params.id;

//       const user = await User.findByPk(userId);

//       if (!user) {
//         return res.status(404).json({ error: "Користувача не знайдено" });
//       }

//       res.json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Помилка отримання користувача" });
//     }
//   }

//   async googleLoginUser(req, res) {
//     try {
//       const token = req.body.token;
//       const clientId = req.body.clientId;
//       console.log("Token:", token);

//       const client = new OAuth2Client(clientId);

//       const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: clientId,
//       });

//       const payload = ticket.getPayload();
//       const userId = payload["sub"];

//       console.log("User ID:", userId);
//       console.log("Email:", payload.email);
//       console.log("Name:", payload.name);

//       const user = await User.findOne({ where: { email: payload.email } });

//       if (user) {
//         res.status(200).json(user);
//       } else {
//         const newUser = await User.create({
//           username: payload.name,
//           email: payload.email,
//           role: "student",
//         });
//         res.status(200).json(newUser);
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Internal Server Error");
//     }
//   }

//   async loginUser(req, res) {
//     try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ where: { email: email } });

//       if (user) {
//         const isMatch = bcrypt.compareSync(password, user.password);
//         if (isMatch) {
//           const token = jwt.sign({ email: user.email, id: user.id }, keys.jwt, {
//             expiresIn: 3600,
//           });

//           res.status(200).json({
//             token: `Bearer ${token}`,
//             user: {
//               id: user.id,
//               username: user.username,
//               name: user.name,
//               email: user.email,
//               role: user.role,
//             },
//           });
//         } else {
//           res.status(401).json({
//             message: "Неправильний пароль",
//           });
//         }
//       } else {
//         res.status(404).json({ error: "Користувача не знайдено" });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Помилка авторизації" });
//     }
//   }

//   async updateUser(req, res) {
//     try {
//       const userId = req.params.id;
//       const updatedUserData = req.file;

//       const filePath = path.join(directoryPath, updatedUserData.filename);

//       if (fs.existsSync(filePath)) {
//         res.sendFile(filePath);
//       } else {
//         console.error("Файл не найден:", filePath);
//         res.status(404).json({ error: "Файл не найден" });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Помилка редагування користувача" });
//     }
//   }

  async deleteSpareParts(req, res) {
    try {
      const id = req.params.id;

      const rowsDeleted = await SpareParts.destroy({ where: { id: id } });

      if (rowsDeleted === 0) {
        return res.status(404).json({ error: "Запчастину не знайдено" });
      }

      res.json({ message: "Запчастину видалено успішно" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Помилка видалення запчастини" });
    }
  }
}

module.exports = new SparePartsController();