
const express = require('express');
const router = express.Router();

const {signup, login, authMiddleware, loginWithCookie,addFriend,removeFriend,resetPassword, logout} = require("../controllers/userController");

router.post('/signup',signup);
router.post('/login',login);

router.get('/login',authMiddleware,loginWithCookie);
// add friend
router.patch('/addFriend', authMiddleware, addFriend);

// remove friend
router.patch('/removeFriend', authMiddleware, removeFriend);
router.patch('/updatePassword', resetPassword);
router.get('/logout',logout)
module.exports = router;
