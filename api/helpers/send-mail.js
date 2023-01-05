const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
require('dotenv').config()
module.exports = {
  friendlyName: "Send mail",
  description: "",
  inputs: {
    options: {
      type: "ref",
      required: true,
    },
  },
  exits: {
    success: {
      description: "All done.",
    },
  },
  fn: async function (inputs) {
    const transporter = nodemailer.createTransport(
      {
        host: "send.smtp.mailtrap.io",
        port: 587,
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_PASS,
        }
      }
    );
    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extName: ".hbs",
          partialsDir: "./views",
          layoutsDir: "./views",
          defaultLayout: "",
        },
        viewPath: "./views/",
        extName: ".hbs",
      })
    );
    try {
      let emailOptions = {
        from: "Wolontario <noreply@wolontario.pl>",
        ...inputs.options,
      };
      await transporter.sendMail(emailOptions);
    } catch (error) {
      sails.log(error);
    }
  },
};