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

  return res.status(200).json({ user, token, message: 'Login successful !' });
});

router.get('/list', async (req, res, next) => {
  let listUser = await userModel.getAllUser();
  if (listUser !== null) {
    listUser = listUser.map((user, i) => {
      user.key = i;
      if (user.permission === 0) {
        user.permission = 'Receptionist';
      } else if (user.permission === 1) {
        user.permission = 'Manager';
      }
      user.password = '********';
      return user;
    });
    if (listUser)
      return res.status(200).json({ listUser, message: 'Successful !' });
    else return res.status(403).json({ message: 'Somethings went wrongs!' });
  } else {
    res.status(204).json({ message: 'No content' });
  }
});

router.patch('/resetpassword', async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const newPassword = bcrypt.hashSync('password123', salt);
  await userModel.resetPassword(req.body.id, newPassword).then((result) => {
    if (!result) return res.status(404).json({ message: 'Somethings wrongs!' });
    res.status(200).json({ message: 'Reset password success!' });
  });
});
router.patch('/delete', async (req, res) => {
  try {
    await userModel.delete(req.body.id).then((result) => {
      if (result) return res.status(200).json({ message: 'Delete success!' });
      return res.status(404).json({ message: 'Somethings wrongs!' });
    });
  } catch (error) {
    res.status(403).json({ message: error });
  }
});
router.patch('/update', async (req, res) => {
  await userModel
    .update(req.body.id, req.body)
    .then((result) => {
      if (result) return res.status(200).json({ message: 'Update success!' });
      return res.status(400).json({ message: 'Something went wrongs!' });
    })
    .catch((err) => {
      if (err) {
        res.status(404).json({ message: err });
      }
    });
});
router.post('/insert', async (req, res) => {
  let value = req.body;
  value.isDelete = 0;
  const salt = bcrypt.genSaltSync(10);
  const newPassword = bcrypt.hashSync(req.body.password, salt);
  value.password=newPassword;
  console.log(value)

  await userModel.insert(value).then((re) => {
    if (re) {
      return res.status(200).json({ message: 'Created' });
    } else {
      return res.status(404).json({ message: 'Not created' });
    }
  });
});
module.exports = router;
