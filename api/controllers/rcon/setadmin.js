require("dotenv").config()

module.exports = {


  friendlyName: 'Setadmin',


  description: 'Setadmin rcon.',


  inputs: {
    userid: {
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
      
    }
  },


  fn: async function (inputs, exits) {
    try {
      if ( inputs.rcon != process.env.RCON_PASS ) {
        return exits.badPass({
          error: "Zly rcon"
        })
      }

      const updatedUser = await User.updateOne({ id: inputs.userid }, {
        isGlobalAdmin: true,
      });

      if ( !updatedUser ) {
        return exits.notAUser({
          error: "Nie ma takiego użytkownika"
        })
      }

      const logHead = `[RCON USAGE WARNING ON ${(new Date().toUTCString()).toUpperCase()}]`
      const userIndentification =  `id{${updatedUser.id}} (${updatedUser.name} ${updatedUser.surname}, ${updatedUser.email})`
      console.log(`${logHead} Przypisano role Administratora użytkownikowi ${userIndentification}`);
      return exits.success({
        message: "Sukces"
      })
    } catch ( err ) {
      console.log(err)
      throw err;
      return exits.error({
        error: "internal server error"
      })
    }
  }


};
