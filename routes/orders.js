const {
  Router
} = require('express');
const Order = require('../models/order');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const orders = await Order
      .find({ 'user.userId': req.user.id })
      .populate('user.userId');

    res.render('orders', {
      isOrder: true,
      title: 'Orders',
      orders: orders.map(order => ({
        ...order._doc,
        price: order.products.reduce((total, prod) => total += prod.count * prod.product.price, 0)
      }))
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await req.user
      .populate('cart.items.productId')
      .execPopulate();

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user
      },
      products: user.cart.items.map(prod => ({
        count: prod.count,
        product: { ...prod.productId._doc }
      }))
    });

    await order.save();
    await req.user.clearCart();

    res.redirect('/orders');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;