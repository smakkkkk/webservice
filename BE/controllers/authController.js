
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Auth = require("../models/authModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fatmatesting21@gmail.com',
    pass: 'bvaktcjxojvbpxnf'
  }
});

// Function to generate a random code
const generateCode = () => {
  return crypto.randomBytes(3).toString('hex'); // Generate a 6 character code
};

// Send sign-in code
exports.sendSignInCode = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  const code = generateCode();
  const codeExpiry = new Date(Date.now() + 10 * 60 * 500); // 10 minutes from now

  try {
    await Auth.findOneAndUpdate(
      { email },
      { email, code, codeExpiry },
      { upsert: true, new: true }
    );

    const mailOptions = {
      from: 'Sender',
      to: email,
      subject: 'Your sign-in code',
      text: `Your sign-in code is: ${code}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ message: "Failed to send email" });
      } else {
        return res.status(200).send({ message: "Sign-in code sent to email" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Verify sign-in code
exports.verifySignInCode = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).send({ message: "Email and code are required" });
  }

  try {
    const user = await Auth.findOne({ email, code });

    if (!user) {
      return res.status(400).send({ message: "Invalid email or code" });
    }

    if (user.codeExpiry < new Date()) {
      return res.status(400).send({ message: "Code has expired" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Token expires in 1 hour
    });

    // Code is valid and not expired
    res.status(200).send({
      message: "Sign-in successful",
      id: user._id,
      email: user.email,
      token: token
        // Include other user properties you want to return
      
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


