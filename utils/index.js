const mapCartItems = (cart) => cart.items.map(prod => ({
  count: prod.count,
  id: prod.productId.id,
  ...prod.productId._doc
}));

const computePrice = (products) => products.reduce((total, prod) => total += prod.price * prod.count, 0);

const getUserProducts = async (user) => {
  const currentUser = await user
    .populate('cart.items.productId')
    .execPopulate();

  return await mapCartItems(currentUser.cart);
};

const isOwner = (product, req) => product.userId.toString() === req.user._id.toString();

module.exports = {
  getUserProducts,
  computePrice,
  isOwner,
};