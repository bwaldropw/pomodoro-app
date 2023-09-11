import admin from 'firebase-admin';
import User from '../models/user.mjs';

const auth = async (req, res, next) => {
  try {
    const firebaseToken = req.headers.authorization?.split(' ')[1];

    const userRecord = await admin.auth().verifyIdToken(firebaseToken);
    console.log(userRecord);

    if (!userRecord) {
      return res.status(401);
    }

    const user = await User.findOne({
      firebaseUserId: userRecord.uid,
    });

    if (!user) {
      return res.status(401);
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401);
  }
};

export default auth;
