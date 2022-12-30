module.exports = {


  friendlyName: 'Get profile',


  description: 'Get user profile',


  inputs: {
    userid: {
      type: 'string',
      require: true,
    }
  },


  exits: {
    success: {
      description: "User found",
    },
    notAUser: {
      statusCode: 404,
      description: "User not found",
    },
  },


  fn: async function (inputs, exits) {
    const userid = inputs.userid
    User.findOne( { id: userid } ).exec( (err, user) => { 
      if ( err ) return exits.error({ message: "Internal server error", error: err } )
      if ( !user ) return exits.notAUser({ message: "Nie ma takiego użytkownika" })
      return exits.success({ message: JSON.parse(JSON.stringify(user)) })
    })

  }


};
