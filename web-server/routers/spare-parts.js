const express = require('express')
const routerChange = express.Router();
const spareParts = require('../controllers/spareParts.js')

// http://localhost:3000/api/viewing

routerChange.get('/viewing', spareParts.getAllnewSpareParts )
// http://localhost:3000/api/changeSpareParts
// routerChange.put('/changeSpareParts',  spareParts.change )
// http://localhost:3000/api/addSpareParts
routerChange.post('/addSpareParts',  spareParts.add )
routerChange.post('/buySpareParts',  spareParts.buySpareParts )
// http://localhost:3000/api/deleteSpareParts/:id
routerChange.delete('/deleteSpareParts/:id',  spareParts.deleteSpareParts )

module.exports = routerChange