const express = require("express");
const router = express.Router();
const User = require('../models/User');

//Authentication routes
router.post("/register", async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {

        return res.status(422).json({ message: "Email already exists" });

    }
    else{

        const user = new User({
          name,
          email: email.toLowerCase(),
          password,
        });
        await user.save();

    }

    // Registration successful
    return res.json({ message: "Registration Done" });

    // res.status(200).json(response);
  } catch (error) {
    console.error("Error registering user:", error);
  }
});

// Login user

router.post("/login", async (req, res) => {
  const { email, password} = req.body;
  
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      
      if (password === user.password) {
        return res.status(402).json({ message: "Invalid password" });
      }

      return res.send({
        message: "Logged in successfully",
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
      });
    }
    else{
      return res.status(400).json({ message: "Wrong credentials" });
    }
  }
  catch (error) {
    return res.send("Error logging user", error);
  }
});

module.exports = router;
