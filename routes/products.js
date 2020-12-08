const {
  Router
} = require('express');
const Product = require('../models/product');
const auth = require('../middleware/auth');
const { isOwner } = require('../utils');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('userId', 'email name');

    res.render('products', {
      title: 'Products',
      isProducts: true,
      userId: req.user ? req.user._id.toString() : null,
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
    params: { id = '' },
    query,
  } = req;

  if (!query.allow) return res.redirect('/');

  try {
    const product = await Product.findById(id);

    if (!isOwner(product, req)) return res.redirect('/products');

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
    const product = await Product.findById(id);

    if (!isOwner(product, req)) return res.redirect('/products');

    Object.assign(product, req.body);
    await product.save();
    res.redirect('/products');
  } catch (err) {
    console.log(err);
  }
})

router.post('/remove', auth, async (req, res) => {
  try {
    const {
      body: { id },
      user: { _id },
    } = req;

    await Product.deleteOne({
      _id: id,
      userId: _id
    });
  
    res.redirect('/products');
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;