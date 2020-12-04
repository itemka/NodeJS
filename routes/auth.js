const {
  Router
} = require('express');

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
    req.session.isAuthenticated = true;
    res.redirect('/');
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