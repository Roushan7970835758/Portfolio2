const nodemailer = require("nodemailer");
const mailJetTransport = require("nodemailer-mailjet-transport");


require('dotenv').config();
const mailjet = require('node-mailjet').connect(
  process.env.API_MAILJET
);
//transport
const transporter = nodemailer.createTransport(
  mailJetTransport({
    auth: {
      api_key: process.env.API_MAILJET,
    },
  })
);

const sendEmailControler = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    //validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "please Provide All Fields",
      });
    }
    //email matter
    transporter.sendMail({
      to:"rroushan40@gmail.com",
      from:"roushankumar22145@gmail.com",
      Subject:'Regarding Mern Portfolio',
      html:`
      <h5>Detail Information</h5>
      <ul>
        <li><p>Name:${name}</p></li>
        <li><p>Email:${email}</p></li>
        <li><p>Message:${msg}</p></li>
      </ul>
      `
    })

    return res.status(200).send({
      success: true,
      message: "Your Message Send Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};
module.exports = { sendEmailControler };
