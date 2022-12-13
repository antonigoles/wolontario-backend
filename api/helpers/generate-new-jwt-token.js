const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = {


  friendlyName: 'Generate new jwt token',


  description: '',


  inputs: {
    subject: {
      type: "string",
      required: true
    }
  },


  exits: {
    success: {
      description: 'All done.',
    },
  },


  fn: async function (inputs) {
    try {
      const payload = {
        sub: inputs.subject, // subject
        iss: "Wolontario API" // issuer
      };
  
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  
      return token;
    } catch(error) {
      sails.log.error(error);
    }
    
  }


};

