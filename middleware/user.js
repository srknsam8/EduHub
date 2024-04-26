import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

const userMiddleWare = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ msg: 'Missing token' });
  }
  try {
    const isValid = jwt.verify(token, JWT_SECRET);
    if (isValid) {
      req.body.userId = isValid.userId;
      next();
    } else {
      return res.json({ msg: 'Token not valid' });
    }
  } catch (error) {
    console.log(error);
  }
};

export default userMiddleWare;
