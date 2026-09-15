const express = require('express');
const router = express.Router();
const { registerUser, loginuser, profIle, deleteUser, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect, admin, roleBased } = require('../middleware/authMiddleWare');


router.post('/register', registerUser);
router.post('/login', loginuser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/profile', protect, profIle);
router.delete('/delete/:id', protect, roleBased('admin'), deleteUser);



module.exports = router;