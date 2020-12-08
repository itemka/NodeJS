const {
  Router
} = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { validationResult } = require('express-validator/check');
const User = require('../models/user');
const mailhelper = require('../utils/mailhelper');
const { registerValidators } = require('../utils/validators');
const { registration, reset } = require('../emails');

const router = Router();

router.get('/login', async (req, res) => {
  try {
    res.render('auth/login', {
      title: 'Login',
      isLogin: true,
      registerError: req.flash('registerError'),
      loginError: req.flash('loginError')
    })
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);

      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save(err => {
          if (err) throw err;
          res.redirect('/');
        })
      } else {
        req.flash('loginError', 'Wrong password');
        res.redirect('/auth/login#login');
      }
    } else {
      req.flash('loginError', 'This user does not exist');
      res.redirect('/auth/login#login');
    }
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

router.post('/register', registerValidators, async (req, res) => {
  try {
    const {
      email,
      password,
      name,
    } = req.body;
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash('registerError', errors.array()[0].msg);
      return res.status(422).redirect('/auth/login#register');
    }

    const user = new User({
      email,
      name,
      password: await bcrypt.hash(password, 10),
      cart: { items: [] }
    });
    await user.save();
    res.redirect('/auth/login#login');
    await mailhelper.sendMail(
      registration(email),
      { name },
      res
    );
  } catch (err) {
    console.log(err);
  }
})

router.get('/reset', (req, res) => {
  res.render('auth/reset', {
    title: 'Forgot password?',
    resetError: req.flash('resetError'),
  });
})

router.post('/reset', async (req, res) => {
  try {
    const { email } = req.body;

    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        req.flash('resetError', 'Please, repeat it a little late.');
        return res.redirect('/auth/reset');
      };

      const token = buffer.toString('hex');
      const candidate = await User.findOne({ email });

      if (candidate) {
        candidate.resetToken = token;
        candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
        await candidate.save();
        await mailhelper.sendMail(
          reset(candidate.email, token),
          {},
          res
        );
        res.redirect('/auth/login');
      } else {
        req.flash('resetError', 'This user does not exist');
        res.redirect('/auth/reset');
      }
    });
  } catch (err) {
    console.log(err);
  }
})

router.get('/password/:token', async (req, res) => {
  try {
    const { token = '' } = req.params;

    if (!token) return res.redirect('/auth/login');

    const user = await User.findOne({
      resetToken: token,
      resetTokenExp: { $gt: Date.now() }
    });

    if (!user) {
      return res.redirect('/auth/login');
    } else {
      res.render('auth/password', {
        title: 'Access recovery',
        passwordError: req.flash('passwordError'),
        userId: user._id.toString(),
        token
      });
    }
  } catch (err) {
    console.log(err);
  }
})

router.post('/password', async (req, res) => {
  try {
    const {
      password,
      userId,
      token
    } = req.body;

    const user = await User.findOne({
      _id: userId,
      resetToken: token,
      resetTokenExp: { $gt: Date.now() }
    });

    if (!user) {
      req.flash('loginError', 'Token lifecycle has expired');
      return res.redirect('/auth/login');
    } else {
      user.password = await bcrypt.hash(password, 10);
      user.resetToken = undefined,
      user.resetTokenExp = undefined,
      await user.save();
      res.redirect('/auth/login');
    }
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;