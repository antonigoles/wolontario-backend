require("dotenv").config()

module.exports = {


  friendlyName: 'Setadmin',


  description: 'Setadmin rcon.',


  inputs: {
    email: {
      type: 'string',
      required: true,
    },
    rcon: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    success: {
      description: "Login successful",
    },
    notAUser: {
      statusCode: 404,
      description: "Nie ma takiego uzytkownika",
    },
    badPass: {
      statusCode: 403,
      description: "Bad pass",
    },
    error: {
        statusCode: 500,
        description: "Internal server error", 
    }
  },


  fn: async function (inputs, exits) {
    try {
        if ( inputs.rcon != process.env.RCON_PASS ) {
            return exits.badPass({
                message: "Zly rcon"
            })
        }
        const userEmail = inputs.email

        const user = await User.findOne({ email: userEmail });

        if ( !user ) {
            return exits.notAUser({
                message: "Nie ma takiego użytkownika"
            })
        }

        return exits.success({
            message: {
                ...user,
                emailProofToken: user.emailProofToken,
            },
        })

    } catch ( err ) {
      console.log(err)
      throw err;
    }
  }


};
