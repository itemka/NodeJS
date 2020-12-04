const {
  Router
} = require('express');
const User = require('../models/user');

const router = Router();

router.get('/login', async (req, res) => {
  try {
    res.render('auth/login', {
      title: 'Login',
      isLogin: true,
    })
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findById('5fc11c1ed11a1631f7839a0c');
    req.session.user = user;
    req.session.isAuthenticated = true;
    req.session.save(err => {
      if (err) throw err;
      res.redirect('/');
    })
  } catch (err) {
    console.log(err);
  }
});

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect('/auth/login#login');
    });
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;