const express = require('express');
const { loginUser, getAllUsers } = require('../controllers/authController');

const router = express.Router();

router.post('/login', loginUser);
router.get('/users', getAllUsers);

module.exports = router;