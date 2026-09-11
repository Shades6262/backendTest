const transporter = require('../../config/mail');

const sendMail = async ({to, subject, html}) => {
  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};  

module.exports = sendMail;