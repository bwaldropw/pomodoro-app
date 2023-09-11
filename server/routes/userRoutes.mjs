import express from 'express';
import admin from 'firebase-admin';
import auth from '../middleware/auth.mjs'
import User from '../models/user.mjs';
const router = express.Router();

// get user info
router.get('/', auth, async (req, res) => {
  res.status(200).json(req.user)
})

// register new user
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    // create new user in firebase auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // create user document in mongodb
    const user = new User({
      firebaseUserId: userRecord.uid,
      email,
    });
    await user.save();

    res.status(201).json({
      message: 'user created successfully',
      user: userRecord,
    });
  } catch (error) {
    res.status(400).json({
      message: 'error creating user',
    });
    console.error(error)
  }
});

export default router;