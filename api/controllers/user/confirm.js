module.exports = {


  friendlyName: 'Confirm',


  description: 'Confirm user.',


  inputs: {
    email: {
      type: 'string',
      required: true,
    },
    token: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    success: {
      statusCode: 200,
      description: "Email address confirmed and requesting user logged in.",
    },
    invalidOrExpiredToken: {
      statusCode: 403,
      description: "The provided token is expired or invalid",
    },
    emailAlreadyConfirmed: {
      statusCode: 403,
      description: "Email already confirmed"
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },


  fn: async function (inputs, exits) {
    try {
      if (!inputs.token) {
        return exits.invalidOrExpiredToken({
          error: "Niepoprawny kod",
        });
      }
  
      const lowercaseEmail = inputs.email.toLowerCase();

      let user = await User.findOne({ email: lowercaseEmail, emailProofToken: inputs.token });
  
      if (!user || user.emailProofTokenExpiresAt <= Date.now() ) {
        return exits.invalidOrExpiredToken({
          error: "Niepoprawny kod albo stracił swoją ważność",
        });
      }
  
      if (user.emailStatus === "unconfirmed") {
        await User.updateOne({ id: user.id }).set({
          emailStatus: "confirmed",
          emailProofToken: "",
          emailProofTokenExpiresAt: 0,
        });
        return exits.success({
          message: "Twoje konto zostało zweryfikowane",
        });
      } 
    } catch(error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
  }
};
