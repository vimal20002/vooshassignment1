// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/userModel.js';
import { OAuth2Client } from 'google-auth-library';
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// User Signup
router.post('/signup', async (req, res) => {
    const {email} = req.body;
    console.log(req.body)
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({...req.body});
        await user.save();
        res.status(201).json({ message:"Created !"});
    } catch (err) {
        console.log(err._message)
        res.status(500).json({ message: err._message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const info ={
            fname:user.fname,
            image:user.image
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: info});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Google OAuth
router.post('/google',async(req,res)=>{
    const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log(payload)
    const { sub, email, name, picture } = payload;
    const existingUser = await User.findOne({ googleId:sub });
    if (existingUser) {
        const info = {
            fname:existingUser.fname,
            image:existingUser.image
        }
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user:info });
        return
    }
    const obj = {
        googleId:sub,
        fname:name,
        email,
        image:picture,
        password:sub
    }
    const user = new User({...obj});
    await user.save();
    res.status(201).json({ message:"Created !"});


  } catch (error) {
    console.error('Error verifying ID token:', error.message);
    res.status(401).json({ message:  error.message });
  }
});

export default router;
