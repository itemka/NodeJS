const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const mongoose = require('mongoose');
const path = require('path');
const {
  homeRoutes,
  productsRoutes,
  addRoutes,
  cardRoutes,
  ordersRoutes,
  authRoutes,
} = require('./routes');
const varMiddleware = require('./middleware/variables');

dotenv.config('./env');

const PORT = process.env.PORT || 3000;

const app = express();

const hbs = exphbs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: 'main',
  extname: 'hbs',
});

const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: 'sessions'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  secret: 'same secret value',
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(varMiddleware);

app.use('/', homeRoutes);
app.use('/products', productsRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);

async function start() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );

    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Server start error: ", err);
  }
}

start();