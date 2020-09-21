const {
  Router
} = require('express');
const Card = require('../models/card');
const Product = require('../models/product');

const router = Router();

router.post('/add', async (req, res) => {
  const {
    body: {
      id = ''
    }
  } = req;

  const product = await Product.getById(id);
  await Card.add(product);

  res.redirect('/card');
});

router.get('/', async (req, res) => {
  const card = await Card.fetch();

  res.render('card', {
    title: 'Basket',
    isCard: true,
    products: card.products,
    price: card.price
  })
})

module.exports = router;