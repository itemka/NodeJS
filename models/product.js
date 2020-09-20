const {
  v4: uuidv4
} = require('uuid');
const fs = require('fs');
const path = require('path');

module.exports = class Product {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuidv4();
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    }
  }

  async save() {
    const product = await Product.getAll();
    product.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'products.json'),
        JSON.stringify(product),
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      )
    })
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'products.json'),
        'utf-8',
        (err, content) => {
          if (err) reject(err);
          else resolve(JSON.parse(content));
        }
      )
    })
  }
}