const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:2002@localhost:5432"
);

const SpareParts = sequelize.define('SpareParts', {
  number: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  nameSpareParts: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

// Модель SparePartsSend
const SparePartsSend = sequelize.define('SparePartsSendsBook', {
  number: DataTypes.INTEGER,
  nameClient: DataTypes.STRING,
  message: DataTypes.TEXT,
  device_id: DataTypes.INTEGER,
  numberPhoneClient: DataTypes.STRING,
  providedService: DataTypes.BOOLEAN,
});


const ServicesSend = sequelize.define("ServicesBook", {
  typeServices: DataTypes.INTEGER,
  categoriesServices: DataTypes.INTEGER,
  numberPhoneClient: DataTypes.STRING,
  nameClient: DataTypes.STRING,
  providedService: DataTypes.BOOLEAN,
  message: DataTypes.TEXT,
});

const Admin = sequelize.define("Admin", {
  name: DataTypes.STRING,
  password: DataTypes.STRING,
});

const Services = sequelize.define("Services", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// Модель для таблиці categories
const Categories = sequelize.define("Categories", {
  service_id: DataTypes.INTEGER,
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Message = sequelize.define('Message', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Визначення зв'язків
Services.hasMany(Categories, { foreignKey: 'service_id' });
Categories.belongsTo(Services, { foreignKey: 'service_id' });

Services.hasMany(ServicesSend, { foreignKey: 'typeServices' });
ServicesSend.belongsTo(Services, { foreignKey: 'typeServices' });

Categories.hasMany(ServicesSend, { foreignKey: 'categoriesServices' });
ServicesSend.belongsTo(Categories, { foreignKey: 'categoriesServices' });


SparePartsSend.belongsTo(SpareParts, { foreignKey: 'device_id' });
SpareParts.hasMany(SparePartsSend, { foreignKey: 'device_id' });


sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Models synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing models");
  });

module.exports = { SpareParts, Services, Categories, ServicesSend, Admin, SparePartsSend, Message };