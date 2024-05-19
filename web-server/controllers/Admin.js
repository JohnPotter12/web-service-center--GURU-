const { Model } = require("sequelize");
const {
  Admin,
  ServicesSend,
  SparePartsSend,
  SpareParts,
  Message,
} = require("../models/models");

class AdminController {
  async singIn(req, res) {
    try {
      const { login, password } = req.body;
      const admin = await Admin.findOne({
        where: { name: login, password: password },
      });

      if (!admin) {
        return res.status(400).json({ message: "Invalid login or password" });
      }
      res.json(admin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteService(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      await ServicesSend.destroy({ where: { id } });
      res.status(200).json({ message: "Service request deleted successfully" });
    } catch (error) {
      console.error("Error deleting service request:", error);
      res.status(500).json({ message: "Error deleting service request" });
    }
  }

  // Оновити providedService на true
  async putServiceProvided(req, res) {
    try {
      const { id } = req.body;
      const serviceSend = await ServicesSend.findByPk(id);

      if (!serviceSend) {
        return res.status(404).json({ message: "Service request not found" });
      }

      serviceSend.providedService = true;
      await serviceSend.save();

      res
        .status(200)
        .json({ message: "Service request updated successfully", serviceSend });
    } catch (error) {
      console.error("Error updating service request:", error);
      res.status(500).json({ message: "Error updating service request" });
    }
  }

  async putSparePartsProvided(req, res) {
    try {
      const { id, sparePartInStock, needDevice, spareParts_id } = req.body;
      const sparePartsSend = await SparePartsSend.findByPk(id);

      if (!sparePartsSend) {
        return res.status(404).json({ message: "Service request not found" });
      }

      sparePartsSend.providedService = true;
      await sparePartsSend.save();

      const spareParts = await SpareParts.findByPk(spareParts_id);

      if (!spareParts) {
        return res.status(404).json({ message: "Service request not found" });
      }

      spareParts.number = sparePartInStock - needDevice;
      await spareParts.save();

      res.status(200).json({
        message: "Service request updated successfully",
        sparePartsSend,
      });
    } catch (error) {
      console.error("Error updating service request:", error);
      res.status(500).json({ message: "Error updating service request" });
    }
  }

  async CreateSpareParts(req, res) {
    try {
      const { number, description, photo, nameSpareParts, price } = req.body;

      const newSparePart = await SpareParts.create({
        number,
        description,
        photo,
        nameSpareParts,
        price,
      });
      res.status(201).json({ message: "Запчастина додана до бази" });
    } catch (error) {
      console.error("Error creating spare part:", error);
      res.status(500).json({ error: "Failed to create spare part" });
    }
  }

  async GetUsersSpareParts(req, res) {
    try {
      const sparePartsRequests = await SparePartsSend.findAll({
        include: [
          {
            model: SpareParts,
            attributes: [
              "nameSpareParts",
              "description",
              "price",
              "id",
              "number",
            ],
          },
        ],
      });
      res.status(200).json(sparePartsRequests);
    } catch (error) {
      console.error("Error fetching spare parts requests:", error);
      res.status(500).json({ message: "Error fetching spare parts requests" });
    }
  }

  async UpdataUsersSpareParts(req, res) {
    const { id } = req.params;
    const { number, description, photo, nameSpareParts, price } = req.body;

    try {
      const sparePart = await SpareParts.findByPk(id);

      if (!sparePart) {
        return res.status(404).json({ message: "Запчастина не знайдена" });
      }

      sparePart.number = number || sparePart.number;
      sparePart.description = description || sparePart.description;
      sparePart.photo = photo || sparePart.photo;
      sparePart.nameSpareParts = nameSpareParts || sparePart.nameSpareParts;
      sparePart.price = price || sparePart.price;

      await sparePart.save();
 
      res
        .status(200)
        .json({ message: "Запчастина оновлена успішно", sparePart });
    } catch (error) {
      console.error("Error updating spare part:", error);
      res.status(500).json({ message: "Помилка при оновленні запчастини" });
    }
  }

  // Оновити запит на запчастини
  async PutUsersSpareParts(req, res) {
    try {
      const {
        id,
        providedService,
        number,
        nameClient,
        message,
        device_id,
        numberPhoneClient,
      } = req.body;
      const sparePartsRequest = await SparePartsSend.findByPk(id);

      if (!sparePartsRequest) {
        return res
          .status(404)
          .json({ message: "Spare parts request not found" });
      }

      sparePartsRequest.providedService = providedService;
      sparePartsRequest.number = number;
      sparePartsRequest.nameClient = nameClient;
      sparePartsRequest.message = message;
      sparePartsRequest.device_id = device_id;
      sparePartsRequest.numberPhoneClient = numberPhoneClient;

      await sparePartsRequest.save();

      res.status(200).json({
        message: "Spare parts request updated successfully",
        sparePartsRequest,
      });
    } catch (error) {
      console.error("Error updating spare parts request:", error);
      res.status(500).json({ message: "Error updating spare parts request" });
    }
  }

  // Видалити запит на запчастини
  async DeleteUsersSpareParts(req, res) {
    try {
      const id = req.params.id;
      await SparePartsSend.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: "Spare parts request deleted successfully" });
    } catch (error) {
      console.error("Error deleting spare parts request:", error);
      res.status(500).json({ message: "Error deleting spare parts request" });
    }
  }

  async DeleteSpareParts(req, res) {
    try {
      const id = req.params.id;
      await SpareParts.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: "Spare parts request deleted successfully" });
    } catch (error) {
      console.error("Error deleting spare parts request:", error);
      res.status(500).json({ message: "Error deleting spare parts request" });
    }
  }


  async getAllMessages  (req, res)   {
    try {
      const messages = await Message.findAll();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения сообщений' });
    }
  };
  
  // Создать сообщение
  async createMessage  (req, res)   {
    try {
      const { name, numberPhone, email, message } = req.body;
      const newMessage = await Message.create({ name, numberPhone, email, message });
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка создания сообщения' });
    }
  };
  
  // Удалить сообщение
  async deleteMessage  (req, res)   {
    try {
      const { id } = req.params;
      await Message.destroy({ where: { id } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Ошибка удаления сообщения' });
    }
  };
}

module.exports = new AdminController();
