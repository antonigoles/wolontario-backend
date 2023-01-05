require("dotenv").config()

module.exports = {


  friendlyName: 'deleteuser',


  description: 'deleteuser rcon.',


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
      
    }
  },


  fn: async function (inputs, exits) {
    try {
      if ( inputs.rcon != process.env.RCON_PASS ) {
        return exits.badPass({
          message: "Zly rcon"
        })
      }

      const updatedUser = await User.destroy({ email: inputs.email }).fetch();

      const logHead = `[RCON USAGE WARNING ON ${(new Date().toUTCString()).toUpperCase()}]`
      const userIndentification =  `id{${updatedUser.id}} (${updatedUser.name} ${updatedUser.surname}, ${updatedUser.email})`
      console.log(`${logHead} Usunięto użytkownika ${userIndentification}`);
      return exits.success({
        message: "Sukces"
      })
    } catch ( err ) {
      console.log(err)
      throw err;
    }
  }


};
