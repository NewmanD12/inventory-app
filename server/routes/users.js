var express = require('express');
var router = express.Router();

const userController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-user', userController.createUser)
router.post('/add-to-sales', userController.addToSales)
router.post('/add-to-cost-of-goods', userController.addToCostOfGoods)

module.exports = router; 
