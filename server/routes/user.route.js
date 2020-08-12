const router = require('express').Router();
const requireToken = require('../middlewares/auth.mdw');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const user = await userModel.singleByUsername(username);

  if (user === null)
    return res.status(404).json({
      message: 'Not found !',
    });

  const rs = bcrypt.compareSync(password, user.password);
  if (!rs)
    return res.status(403).json({
      message: 'Wrong password !',
    });

  const token = jwt.sign({ user: username }, 'anhem1nha', {
    expiresIn: '1h',
    algorithm: 'HS256',
  });

  delete user.password;
  delete user.username;

  return res.status(200).json({ user, token, message: 'Login successful !' });
});

router.get('/list', async (req, res, next) => {
  const listUser = await userModel.getAllUser();
  if (listUser) res.status(200).json({ listUser, message: 'Successful !' });
  else res.status(404).json({ message: 'Not found !' });
});

module.exports = router;
