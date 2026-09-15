const transporter = require('../../config/mail');

const sendMail = async ({to, subject, html}) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log("Email sent successfully:", info.response);
    return info;
  } catch (err) {
    console.error("Nodemailer Error:", err);
    throw err;
  }
};  

module.exports = sendMail;