const {
  Router
} = require('express');
const Product = require('../models/product');
const auth = require('../middleware/auth');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('userId', 'email name');

    res.render('products', {
      title: 'Products',
      isProducts: true,
      products,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  const {
    params: {
      id = ''
    }
  } = req;

  try {
    const product = await Product.findById(id);

    res.render('product', {
      layout: 'empty',
      title: `Product ${product.title}`,
      isProduct: true,
      product,
    })
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id/edit', auth, async (req, res) => {
  const {
    params: {
      id = '',
    },
    query
  } = req;

  if (!query.allow) return res.redirect('/');

  try {
    const product = await Product.findById(id);

    res.render('product-edit', {
      title: `Edit ${product.title}`,
      product,
    });
  } catch (err) {
    console.log(err);
  }
})

router.post('/edit', auth, async (req, res) => {
  try {
    const { id } = req.body;
    delete req.body.id;

    await Product.findByIdAndUpdate(id, req.body);

    res.redirect('/products');
  } catch (err) {
    console.log(err);
  }
})

router.post('/remove', auth, async (req, res) => {
  try {
    const { id } = req.body;

    await Product.deleteOne({ _id: id });
  
    res.redirect('/products');
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;