const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetEmail = (to, token) => {
  const url = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Parola Sıfırlama',
    html: `<p>Parolanızı sıfırlamak için <a href="${url}">tıklayın</a>.</p>`
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };