const express = require('express');
const { registerUser, loginUser, getUsers,forgotUser,resetuser,resetpost } = require('../userController');
const { userRegisterValidate, userLoginValidate } = require('../utils/userValiadation');
const { ensureAuthenticated } = require('../utils/auth');
const routes = express.Router();



routes.post('/register', userRegisterValidate ,registerUser);


routes.post('/login', userLoginValidate, loginUser);

routes.get('/users', ensureAuthenticated, getUsers);


routes.post("/forgot",forgotUser );
  
  routes.get("/reset-password/:id/:token", resetuser);
  
  routes.post("/reset-password/:id/:token", resetpost);
  

module.exports = routes;