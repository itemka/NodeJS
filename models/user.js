const { Schema, model } = require('mongoose');

const user = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1
        },
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        }
      }
    ]
  }
});

user.methods.addToCart = function(product) {
  const items = [...this.cart.items];
  const idx = items.findIndex(prod => prod.productId.toString() === product._id.toString());

  if (items[idx]) {
    items[idx].count = items[idx].count + 1;
  } else {
    items.push({
      count: 1,
      productId: product._id,
    })
  }

  this.cart = { items }

  return this.save();
}

user.methods.removeFromCart = function(id) {
  let items = [...this.cart.items];
  const idx = items.findIndex(prod => prod.productId.toString() === id.toString());

  if (items[idx].count === 1) {
    items = items.filter(prod => prod.productId.toString() !== id.toString());
  } else {
    items[idx].count--;
  }

  this.cart = { items }

  return this.save();
}

user.methods.clearCart = function() {
  this.cart = { items: [] };
  
  return this.save();
}

module.exports = model('User', user);