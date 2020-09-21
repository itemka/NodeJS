const fs = require('fs');
const path = require('path');

module.exports = class Card {
  static async add(product) {
    const card = await Card.fetch();

    const idx = card.products.findIndex(prod => prod.id === product.id);
    const candidate = card.products[idx]

    if (candidate) {
      candidate.count++;
      card.products[idx] = candidate;
    } else {
      product.count = 1;
      card.products.push(product);
    }

    card.price += +product.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'card.json'),
        JSON.stringify(card),
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      )
    })
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'card.json'),
        'utf-8',
        (err, content) => {
          if (err) reject(err);
          else resolve(JSON.parse(content));
        }
      )
    })
  }
}