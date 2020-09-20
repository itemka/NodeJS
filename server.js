const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');

dotenv.config('./env');

const PORT = process.env.PORT || 3000;

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Main page',
    isHome: true,
  });
});

app.get('/products', (req, res) => {
  res.render('products', {
    title: 'Products',
    isProducts: true,
  });
});

app.get('/add', (req, res) => {
  res.render('add', {
    title: 'Add products',
    isAdd: true,
  });
});

app.post('/', (req, res) => {
  const {
    body = ''
  } = req;

  res.status(200).send(body);
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${PORT}`);
});