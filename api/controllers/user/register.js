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
      const token = "XXXXXX".split("").map( e => Math.floor( Math.random() * 10 ) ).join("");
      
      const existingUser = await User.findOne({ email: newEmailAddress });

      const FortyFiveSecs = 1000*45;
      const OneHour = 1000*60*60;

      if ( existingUser && existingUser.emailStatus == 'unconfirmed' ) {
        const hashedPassword = await sails.helpers.passwords.hashPassword(
          inputs.password
        );
        await User.updateOne({ email: newEmailAddress }, {
          name: inputs.name,
          surname: inputs.surname,
          password: hashedPassword,
        })

        return exits.success({
          message: `An account has been created for ${existingUser.email} successfully. Check your email to verify`,
          nextEmailAvailableIn: Math.max(0, FortyFiveSecs - (Date.now() - existingUser.lastEmailSentAt)),
        });
      }

      let newUser = await User.create({
        name: inputs.name,
        surname: inputs.surname,
        password: inputs.password,
        email: newEmailAddress,
        emailProofToken: token,
        emailProofTokenExpiresAt: 
          Date.now() + OneHour, //1 hour
        lastEmailSentAt: Date.now(),
      }).fetch();

      const email = {
        to: newUser.email,
        subject: 'Potwierdź rejestracje',
        template: 'confirm',
        context: {
          name: `${newUser.name} ${newUser.surname}`,
          confirmCode: token,
        }
      }

      await sails.helpers.sendMail(email);

      return exits.success({
        message: `An account has been created for ${newUser.email} successfully. Check your email to verify`,
        nextEmailAvailableIn: Math.max(0, FortyFiveSecs - (Date.now() - newUser.lastEmailSentAt)),
      });
    } catch(error) {
      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse({
          message: 'Oops :) an error occurred',
          error: 'Ten adres mailowy jest już zajety, ',
        });
      }

      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
    

  }


};
