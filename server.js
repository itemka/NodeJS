const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const {
  homeRoutes,
  productsRoutes,
  addRoutes,
  cardRoutes,
} = require('./routes');

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

app.use('/', homeRoutes);
app.use('/products', productsRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${PORT}`);
});