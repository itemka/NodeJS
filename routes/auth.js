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

module.exports = router;