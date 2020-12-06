const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config('./env');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: 'smtp.yandex.by',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
});

transporter.on('token', (token) => {
  console.log('A new access token was generated');
  console.log('User: %s', token.user);
  console.log('Access Token: %s', token.accessToken);
  console.log('Expires: %s', new Date(token.expires));
});

module.exports.sendMail = async (additionalMailOption, body, res) => {
  const {
    name,
    files = []
  } = body;

  let attachments;
  if (files) {
    attachments = files.map((file) => ({
      filename: `${file.originalname}`,
      content: file.buffer,
    }));
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    ...additionalMailOption,
    text: `Sample text for ${name}`,
    attachments
  };

  await transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(502).send(JSON.stringify(error));
    } else {
      res.status(201).send(JSON.stringify('success'));
    }
  });
};