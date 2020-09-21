const toCurrency = (price) => {
  return new Intl.NumberFormat(
      'en-EN', {
        currency: 'usd',
        style: 'currency'
      }
    )
    .format(price);
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent);
})

const $card = document.querySelector('#card');

if ($card) {
  $card.addEventListener('click', ({
    target: {
      classList,
      dataset: {
        id
      }
    }
  }) => {
    if (classList.contains('js-remove')) {
      fetch(`/card/remove/${id}`, {
          method: 'delete',
        })
        .then(res => res.json())
        .then(card => {
          if (card.products.length) {
            const html = card.products.map(prod => {
              return `
                <tr>
                  <td>${prod.title}</td>
                  <td>${prod.count}</td>
                  <td>
                    <button class="btn btn-small js-remove" data-id="${prod.id}">Remove</button>
                  </td>
                </tr>
              `;
            }).join('');

            $card.querySelector('tbody').innerHTML = html;
            $card.querySelector('.price').textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = '<p>Basket is empty</p>'
          }
        });
    }
  });
}