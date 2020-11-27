const {
  Router
} = require('express');
const Product = require('../models/product');

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
  // TODO
  // const card = await Card.fetch();

  // res.render('card', {
  //   title: 'Basket',
  //   isCard: true,
  //   products: card.products,
  //   price: card.price
  // })

  res.json({test: true})
})

router.delete('/remove/:id', async (req, res) => {
  const {
    params: {
      id = ''
    }
  } = req;

  const card = await Card.remove(id);
  res.status(200).json(card);
})

module.exports = router;