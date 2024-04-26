import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
  const { username, firstname, lastname, password } = req.body;
  if (!username || !firstname || !lastname || !password) {
    return res.json({ msg: 'Missing rqeuired parameters' });
  }

  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return res.json({ msg: 'user already exists' });
    }
    const newUser = new User({
      username: username,
      firstname: firstname,
      lastname: lastname,
      password: password,
    });
    const userCreationResponse = await newUser.save();
    if (userCreationResponse) {
      res.json({ msg: 'User profile created successfully' });
    } else {
      res.json({ msg: 'failed to create user account' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ msg: 'Missing required parameters' });
  }
  try {
    const isExists = await User.findOne({ username: username });
    if (!isExists) {
      return res.json({ msg: 'User doest exists' });
    }
    if (isExists.password == password) {
      const token = jwt.sign({ userId: isExists._id.toString() }, JWT_SECRET);
      res.json({ msg: 'Sign in successfull', token: token });
    } else {
      res.json({ msg: 'Invalid password' });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
