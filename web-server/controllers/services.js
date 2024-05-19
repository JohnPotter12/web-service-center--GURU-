const { ServicesSend, Categories, Services } = require("../models/models");

const fs = require("fs");
const path = require("path");
const directoryPath = path.join(__dirname, "../uploads");

class ServicesController {
  async requestService(req, res) {   ////////////users book services
    try {
      


      const { typeServicesId, categoriesServicesId, numberPhoneClient, nameClient, message, providedService } = req.body;

    console.log(req.body);
    
    // Перевіряємо наявність сервісу та категорії
    const serviceExists = await Services.findByPk(typeServicesId);
    const categoryExists = await Categories.findByPk(categoriesServicesId);

    if (!serviceExists) {
      return res.status(400).json({ message: `Service with id ${typeServicesId} does not exist.` });
    }

    if (!categoryExists) {
      return res.status(400).json({ message: `Category with id ${categoriesServicesId} does not exist.` });
    }
      

      const servicesSend = await ServicesSend.create({
        typeServices: typeServicesId,
        categoriesServices: categoriesServicesId,
        numberPhoneClient: numberPhoneClient,
        nameClient: nameClient,
        providedService: providedService,
        message: message,
      });

      console.log("Запит на послугу надіслано");
      res.status(201).json({
        message: "Запит на послугу надіслано",
        newServiceSend: servicesSend,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Помилка створення запиту" });
    }
  }

  async getAllnewSpareParts(req, res) { /////////////////////////// admin viewing users book services
    try {
      const servicesSendData = await ServicesSend.findAll({
        include: [
          {
            model: Categories,
            include: [
              {
                model: Services,
              }
            ]
          }
        ]
      });
      res.json(servicesSendData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Помилка отримання запчастин" });
    }
  }

  async GetServicesAll(req, res) { ////////////////////////////////////////users viewing services
    try {
      const services = await Services.findAll({
        include: [{
          model: Categories,
          as: 'Categories'
        }]
      });
      res.json(services);
    } catch (error) {
      console.error("Error fetching services with categories", error);
      res.status(500).send("Internal Server Error");
    }
  };

  async GetServicesCategories( req, res ) {


    try {

      const serviceId = req.params.serviceId;
      console.log(serviceId);
      const categories = await Categories.findAll({
        where: { service_id: serviceId}
      });
      res.json(categories);
    } catch (error) {
      console.error("Error fetching services with categories", error);
      res.status(500).send("Internal Server Error");
    }

  }


  // async reques(req, res) {   ////////////users book services
  //   const { services, categories } = req.body;

  // try {
  //   // Створюємо послуги
  //   const createdServices = await Services.bulkCreate(services);

  //   // Отримуємо ідентифікатори створених послуг
  //   const serviceMap = createdServices.reduce((acc, service) => {
  //     acc[service.name] = service.id;
  //     return acc;
  //   }, {});

  //   console.log(serviceMap.id);

  //   // Оновлюємо service_id у категоріях
  //   const categoriesToCreate = categories.map(category => ({
  //     ...category,
  //     service_id: category.service_id
      
  //   })); 
  //   console.log(categoriesToCreate);

  //   // Створюємо категорії
  //   await Categories.bulkCreate(categoriesToCreate);

  //   res.status(201).json({
  //     message: 'Services and categories created successfully',
  //     services: createdServices,
  //     categories: categoriesToCreate
  //   });
  // } catch (error) {
  //   console.error('Error creating services and categories:', error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
  // }

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

//   async deleteSpareParts(req, res) {
//     try {
//       const userId = req.params.id;

//       const rowsDeleted = await User.destroy({ where: { id: userId } });

//       if (rowsDeleted === 0) {
//         return res.status(404).json({ error: "Користувач не знайдено" });
//       }

//       res.json({ message: "Користувач видалено успішно" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Помилка видалення користувача" });
//     }
//   }
}

module.exports = new ServicesController();