const express = require('express');
const morgan = require('morgan');
const body = require('body-parser')
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');

const { connectToPostgreSQL } = require("./config/database.js");

connectToPostgreSQL();



const spareParts = require('./routers/spare-parts')
const services = require('./routers/services')
const admin = require('./routers/admin.js')

app.use(morgan('dev'));
app.use(require('cors')())
app.use(express.json({ limit: '50mb' })); // Устанавливаем лимит для JSON запросов
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(body.json());

app.use('/api', spareParts);
app.use('/api', services);
app.use('/api', admin);

// const fetchData = async (url) => {
//     try {
//       const response = await axios.get(url);
//     //   console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching data: ${error}`);
//       return null;
//     }
//   };
  
//   // Функція для парсингу HTML-коду
//   const parseData = (html) => {
//     const $ = cheerio.load(html);
//     const parsedData = [];
//     $('.img200').each((index, element) => {
//         console.log(element);
//       const title = $(element).find('#img_200_1887588').attr('alt');
//       const content = $(element).find('#img_200_1887588').attr('src');
//       parsedData.push({ title, content });
//     });
//     return parsedData;
//   };
  
//   // Маршрут для отримання парсингу даних
//   app.get('/api/posts', async (req, res) => {
//     const url = 'https://ek.ua/ua/APPLE-SILICONE-CASE-WITH-MAGSAFE-FOR-IPHONE-12-12-PRO.htm'; // Замість цього URL використовуйте потрібний вам
//     const html = await fetchData(url);
//     if (html) {
//       const data = parseData(html);
//       res.json(data);
//     } else {
//       res.status(500).send('Error fetching data');
//     }
//   });

module.exports = app;