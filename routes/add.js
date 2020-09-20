const {
  Router
} = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Add products',
    isAdd: true,
  });
});

router.post('/', (req, res) => {
  const {
    body = ''
  } = req;

  console.log(body);

  res.redirect('/products');
});

module.exports = router;