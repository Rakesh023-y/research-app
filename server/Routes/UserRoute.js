const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const router = express.Router();
router.post("/register", async (req, res) => {

  try {
    const {
      name,
      email,
      password,
    } = req.body;

    // validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword
    });

    // Create token
    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    // get user input
    const { email, password } = req.body;
    // validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // validate if user exist in our database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      //create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY
      );
      //save user token
      user.token = token;
      console.log(user)
      // return response
      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/users/:id", async (req, res) => {
  const userData = await User.findOne({ _id: req.params.id })
  res.status(200).json(userData);
})

router.delete("/users/:id", async (req, res) => {
  const userData = await User.findOneAndDelete({_id: req.params.id } )
  res.status(200).json({userData}); 
})
router.get("/users", async (req, res) => {
  let query = req.query;
  let page = query.page;
  let per_page = query.per_page;
  let userData = await User.find()
    .limit(Number(per_page))
    .skip(Number(per_page) * (Number(page) - 1))
    .sort("desc");
  res.status(200).json(userData);
})
router.post("/update_user", async (req, res) => {
  let { name, email, user_id } = req.body;
  let user_detail = await User.findOne({ _id: Object(user_id) });
  if (user_detail) {
    await User.updateOne({ _id: Object(user_id) }, { name: name, email: email });
  }
  res.status(201).json({ success: true });
})

module.exports = router;

