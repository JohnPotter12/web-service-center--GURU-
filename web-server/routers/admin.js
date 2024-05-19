const express = require('express')
const router = express.Router();
const admin = require('../controllers/Admin.js')

router.post('/admin/auth',  admin.singIn )

// http://localhost:3000/api/admin/services/
// router.get('/admin/services', admin.GetServicesAll )

// http://localhost:3000/api/admin/servicesDelete
router.delete('/admin/servicesDelete/:id', admin.deleteService)
router.put('/admin/services', admin.putServiceProvided )

router.post('/admin/createSpareParts', admin.CreateSpareParts)
router.get('/admin/userSpareParts', admin.GetUsersSpareParts )
router.put('/admin/updateSpareParts/:id', admin.UpdataUsersSpareParts )

router.put('/admin/userSpareParts', admin.PutUsersSpareParts )
router.put('/admin/sparePartsProvided', admin.putSparePartsProvided )
router.delete('/admin/userSpareParts/:id', admin.DeleteUsersSpareParts )
router.delete('/admin/spareParts/:id', admin.DeleteSpareParts )

router.get('/admin/messages', admin.getAllMessages);
router.post('/admin/messages', admin.createMessage);
router.delete('/admin/messages/:id', admin.deleteMessage);

module.exports = router