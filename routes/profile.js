const {
  Router
} = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');

const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    res.render('profile', {
      title: 'Profile',
      isProfile: true,
      user: req.user.toObject()
    });
  } catch (err) {
    console.log(err)
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const {
      user: { _id },
      body: { name }
    } = req;
    const user = await User.findById(_id);

    const toChange = { name }

    if (req.file) {
      toChange.avatarUrl = req.file.path;
    }

    Object.assign(user, toChange);
    await user.save();
    res.redirect('/profile');
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;