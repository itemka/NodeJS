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

  static async update(product) {
    const products = await Product.getAll();

    const ind = products.findIndex(prod => prod.id === product.id);

    products[ind] = product;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'products.json'),
        JSON.stringify(products),
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      )
    })
  }

  async save() {
    const products = await Product.getAll();
    products.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'products.json'),
        JSON.stringify(products),
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

  static async getById(id) {
    const products = await Product.getAll();
    return products.find(prod => prod.id === id);
  }
}