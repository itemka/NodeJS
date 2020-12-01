const {
  Router
} = require('express');
const Product = require('../models/product');
const { getUserProducts , computePrice } = require('../utils');

const router = Router();

router.post('/add', async (req, res) => {
  const {
    body: {
      id = ''
    }
  } = req;

  try {
    const product = await Product.findById(id);
    await req.user.addToCart(product);
  
    res.redirect('/card');
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await getUserProducts(req.user);

    res.render('card', {
      title: 'Basket',
      isCard: true,
      products,
      price: computePrice(products)
    });
  } catch (err) {
    console.log(err);
  }
})

router.delete('/remove/:id', async (req, res) => {
  const {
    params: {
      id = ''
    }
  } = req;

  try {
    await req.user.removeFromCart(id);
    const products = await getUserProducts(req.user);

    res.status(200).json({
      products,
      price: computePrice(products),
    });
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;