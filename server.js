const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.get('/', (req, res) => {
  res.status(200);
  res.render('index');
});

app.get('/about', (req, res) => {
  res.status(200);
  res.render('about');
});

app.get('/api/users', (req, res) => {
  const users = [{
      name: 'Artyom',
      age: 24
    },
    {
      name: 'Dan',
      age: 35
    },
  ];

  res.send(users);
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