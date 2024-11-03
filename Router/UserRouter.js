const express = require('express');
const UserRouterClint = express.Router();
const {Users , loginUser , getUserProfile, logoutUser, getAllUsers, blockUser, deleteUser, updateUserProfile } = require('../controllers/RegisterControll');
const upload = require('../MulterUploade/multer');


UserRouterClint.post('/users',  Users)
UserRouterClint.post('/users/login', loginUser);
UserRouterClint.get('/user', getUserProfile);
UserRouterClint.post('/user/logout', logoutUser);
UserRouterClint.get('/all/users', getAllUsers);
UserRouterClint.put('/user/block/:id', blockUser);
UserRouterClint.delete('/user/delete/:id', deleteUser);
UserRouterClint.put('/update-user/:id', upload.single('image')  ,  updateUserProfile);








module.exports = UserRouterClint;

