const dotenv = require('dotenv');

dotenv.config('./env');

const registration = (email) => ({
  to: email,
  subject: 'Account created',
  html: `
    <h1>Welcome to our store!</h1>  
    <p>Registration completed successfully for ${email}</p>
    <hr />
    <a href="${process.env.BASE_URL}">View store</a>
  `,
});

module.exports = {
  registration,
};