document.querySelectorAll('.price').forEach(node => {
  node.textContent = new Intl.NumberFormat(
      'en-EN', {
        currency: 'usd',
        style: 'currency'
      }
    )
    .format(node.textContent);
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
          console.log('card', card)
        });
    }
  });
}