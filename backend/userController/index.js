const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
module.exports = {
    // validate req.body - Done
    // create MongoDB UserModel - Done
    // do password encrytion - Done
    // save data to mongodb - 
    // return response to the cliein
    registerUser: async (req,res)=>{
        const userModel = new UserModel(req.body);
        userModel.password = await bcrypt.hash(req.body.password, 10);
        try{
            const response = await userModel.save();
            response.password = undefined;
            return res.status(201).json({message:'success', data: response,state:true});
        }catch(err){
            return res.status(500).json({message: 'user Exists!', err,state:false});
        }
    },

    // check user using email
    // compare password 
    // create jwt token
    // send response to client
    loginUser:async (req,res)=>{
       try{
        const user = await UserModel.findOne({email: req.body.email});
        if(!user){
            return res.status(401)
                .json({message: 'Auth failed, Invalid username/password'});
        }

        const isPassEqual = await bcrypt.compare(req.body.password, user.password);
        // console.log(isPassEqual)
        if(!isPassEqual){
            return res.status(401)
                .json({message: ' Invalid username/password',state:false});
        }
        if(isPassEqual){

        
        const tokenObject = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
        const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {expiresIn: '4h'});
        // res.cookie('jwt',jwtToken);
        return res.status(200)
            .json({jwtToken, tokenObject,state:true});
    }
       }catch(err){
            return res.status(500).json({message:'error',err});
       }
    },

    getUsers : async(req,res)=>{
        try{
            const users = await UserModel.find({}, {password:0});
            return res.status(200)
                .json({data: users});
        }catch(err){
            return res.status(500)
                .json({message:'error', err});
        } 
    },

    forgotUser :async (req, res) => {
        const  email  = req.body.email;
        try {
          const oldUser = await UserModel.findOne({ email });
          if (!oldUser) {
            return res.send({ message: "Check You Email!" });
          }

          const randomNumber = Math.floor(100000 + Math.random() * 900000);
          
            var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "adarsh438tcsckandivali@gmail.com",
              pass: "rmdklolcsmswvyfw",
            },
          });
      
          var mailOptions = {
            from: "youremail@gmail.com",
            to: "thedebugarena@gmail.com",
            subject: "Password Reset",
            text: link,
          };
      
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          console.log(link);
        } catch (error) {}
      },
    resetuser:async (req, res) => {
        const { id, token } = req.params;
        console.log(req.params);
        const oldUser = await User.findOne({ _id: id });
        if (!oldUser) {
          return res.json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        try {
          const verify = jwt.verify(token, secret);
          res.render("index", { email: verify.email, status: "Not Verified" });
        } catch (error) {
          console.log(error);
          res.send("Not Verified");
        }
      },

    resetpost:async (req, res) => {
        const { id, token } = req.params;
        const { password } = req.body;
      
        const oldUser = await User.findOne({ _id: id });
        if (!oldUser) {
          return res.json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        try {
          const verify = jwt.verify(token, secret);
          const encryptedPassword = await bcrypt.hash(password, 10);
          await User.updateOne(
            {
              _id: id,
            },
            {
              $set: {
                password: encryptedPassword,
              },
            }
          );
      
          res.render("index", { email: verify.email, status: "verified" });
        } catch (error) {
          console.log(error);
          res.json({ status: "Something Went Wrong" });
        }
      }
}