const express = require('express')
const router = express.Router();
const services = require('../controllers/services.js')

// http://localhost:5000/api/servicesUsersBook
router.get('/admin/services', services.getAllnewSpareParts )
// http://localhost:3000/api/servicesCreate/Send
router.post('/servicesCreate/Send',  services.requestService )
// http://localhost:3000/api/services/categories/:serviceId
router.get('/services/categories/:serviceId', services.GetServicesCategories )

// http://localhost:3000/api/admin/services/
router.get('/services', services.GetServicesAll )
// http://localhost:3000/api/admin/services/
// router.get('/admin/servicesDelete', services.deleteService)

// router.post('/services', services.reques )

module.exports = router