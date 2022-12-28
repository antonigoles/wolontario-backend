module.exports = {


  friendlyName: 'Langs',


  description: 'Langs user.',


  inputs: {

  },


  exits: {
    success: {
      description: "Success",
    },
    notAUser: {
      statusCode: 404,
      description: "Nie ma takiego uzytkownika",
    },
    error: {
      statusCode: 500,
      description: "Internal server error",
    },
  },


  fn: async function (_, exits) {
    const userid = this.req.user.id
    User.findOne( { id: userid }, ).exec( (err, user) => { 
      if ( err ) return exits.error({ message: "Internal server error"} )
      if ( !user ) return exits.notAUser({ message: "Błąd weryfikacji JWT" })
      return exits.success({ message: (user.languages == null ? [] : user.languages) })
    })

  }


};
