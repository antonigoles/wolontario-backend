module.exports = {
  friendlyName: 'Register',
  description: 'Register user.',
  inputs: {
    name: {
      type: 'string',
      required: true,
    },
    surname: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8,
    },
    tosAccepted: {
      type: 'boolean',
      required: true,
    }
  },


  exits: {
    success: {
      statusCode: 201,
      description: 'New user created',
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email jest juz zajety',
    },
    tosNotAccepted: {
      statusCode: 403,
      description: "Musisz zaakceptowac ToS"
    },
    error: {
      description: 'Something went wrong',
    },
  },


  fn: async function (inputs, exits) {
    try {
      if ( !inputs.tosAccepted ) {
        return exits.tosNotAccepted({
          message: 'Oops :) an error occurred',
          error: 'Musisz zaakceptowac ToS',
        })
      }
      const newEmailAddress = inputs.email.toLowerCase();
      const token = await sails.helpers.strings.random('url-friendly');
      let newUser = await User.create({
        name: inputs.name,
        surname: inputs.surname,
        password: inputs.password,
        email: newEmailAddress,
        emailProofToken: token,
        emailProofTokenExpiresAt: 
          Date.now() + sails.config.custom.emailProofTokenTTL
      }).fetch();

      const jwtToken = await sails.helpers.generateNewJwtToken(newUser.email);


      // const confirmLink = `${sails.config.custom.baseUrl}/user/confirm?token=${token}`;

      // const email = {
      //   to: newUser.email,
      //   subject: 'Potwierdź rejestracje',
      //   template: 'confirm',
      //   context: {
      //     name: `${newUser.name} ${newUser.surname}`,
      //     confirmLink: confirmLink,
      //   }
      // }

      // await sails.helpers.sendMail(email);

      return exits.success({
        message: `An account has been created for ${newUser.email} successfully. Check your email to verify`,
        data: newUser,
        token: jwtToken,
      });
    } catch(error) {
      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse({
          message: 'Oops :) an error occurred',
          error: 'Ten adres mailowy jest już zajety',
        });
      }

      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
    

  }


};
