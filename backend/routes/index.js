const express = require('express');
const { registerUser, loginUser, getUsers} = require('../userController');
const { userRegisterValidate, userLoginValidate } = require('../utils/userValiadation');
const { ensureAuthenticated } = require('../utils/auth');
const {Links}=require('../utils/getlinks.js')
const routes = express.Router();



routes.post('/register', userRegisterValidate ,registerUser);
// routes.post('/register' ,registerUser);


routes.post('/login', userLoginValidate, loginUser);

routes.get('/users', ensureAuthenticated, getUsers);

const upload =require('../utils/upload.js');
const { uploadImage, getImage } =require('../userController/image-controller.js');


routes.post('/upload', upload.single('file'), uploadImage);
routes.get('/file/:fileId', getImage);

routes.post('/getlinks',Links)


  

module.exports = routes;