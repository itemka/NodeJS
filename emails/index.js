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

const reset = (email, token) => ({
  to: email,
  subject: 'Access recovery',
  html: `
    <h1>Forgot password?</h1>  
    <p>If not - ignoring this messages</p>
    <p>Else tap to this link: <a href="${process.env.BASE_URL}/auth/password/${token}">Access recovery</a></p>
  `,
});

module.exports = {
  registration,
  reset,
};