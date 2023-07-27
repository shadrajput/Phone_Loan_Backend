const nodemailer = require("nodemailer");
const { EMAIL, EMAIL_GEN_PASSWORD } = require('../../constant')

const SendEmail = async (options) => {
  let transpoter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: EMAIL,
      pass: EMAIL_GEN_PASSWORD, 
    },
  });
  const res = await transpoter.sendMail(options);
};

module.exports= SendEmail