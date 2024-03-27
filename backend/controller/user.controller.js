const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/db");

const userController = express.Router();

//Signup
userController.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({ msg: "Please fill all the feild!" });
  }
  try {
    const emailExist = await UserModel.findOne({ email });
    if (emailExist) {
      return res
        .status(400)
        .send({ msg: "User Already exists! please use another email" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(500).send({ msg: "Something went wrong, try again" });
      }
      try {
        const user = await UserModel.create({
          name,
          email,
          password: hash,
        });
        res.status(201).send({ msg: "User Created Successfully" });
        console.log(user);
      } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Something went wrong, try agian" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Something went wrong, try again" });
  }
});

// Login here
userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ msg: "Please fill all the feild" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "Please register first!" });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return res.status(201).send({
          msg: "login successful",
          userData: {
            token,
            name: user.name,
          },
        });
      } else {
        res.status(401).send({ msg: "Wrong Credentials, try again!" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Something went wrong, try again" });
  }
});

module.exports = userController;
