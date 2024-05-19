const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:2002@localhost:5432"
);

async function connectToPostgreSQL() {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to PostgreSQL!");
  } catch (error) {
    console.error("Failed to connect to PostgreSQL:", error);
  }
}

module.exports = {
  sequelize,
  connectToPostgreSQL,
};