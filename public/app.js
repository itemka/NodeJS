const toCurrency = (price) => new Intl.NumberFormat('en-EN', {
  currency: 'usd',
  style: 'currency'
}).format(price);

const toDate = (date) => new Intl.DateTimeFormat('en-EN', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
}).format(new Date(date));

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent);
})

document.querySelectorAll('.date').forEach(node => {
  node.textContent = toDate(node.textContent);
})

const $card = document.querySelector('#card');

if ($card) {
  $card.addEventListener('click', ({
    target: {
      classList,
      dataset: {
        id,
        csrf,
      }
    }
  }) => {
    if (classList.contains('js-remove')) {
      fetch(`/card/remove/${id}`, {
          method: 'delete',
          headers: {
            'X-XSRF-TOKEN': csrf
          }
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

M.Tabs.init(document.querySelector('.tabs'));