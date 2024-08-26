const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const errorHandler = require("../utils/error");

const signup = async (req, res , next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    next(err);
  }
};
const signin = async (req,res,next) =>{
  const {email, password} = req.body;
  try{
    const validUser = await User.findOne({email});
    if(!validUser) return next(errorHandler(404,'user not found'));
    const validPassword = bcryptjs.compareSync(password,validUser.password);
    if(!validPassword) return next(errorHandler(401,'wrong credentials'));
    const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET);
    const {password: hashedPassword , ...rest} = validUser._doc;
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    

  }catch(err){
    next(err);
  }

}
module.exports = { signup ,signin};
