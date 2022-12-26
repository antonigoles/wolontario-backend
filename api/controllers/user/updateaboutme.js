module.exports = {


  friendlyName: 'Updateaboutme',


  description: 'Updateaboutme user.',


  inputs: {
    newAboutMe: {
      type: 'string',
      require: true,
    }
  },


  exits: {
    success: {
      description: "Success",
    },
    notAUser: {
      statusCode: 404,
      description: "Nie ma takiego uzytkownika",
    },
    badInput: {
      statusCode: 401,
      description: "Zle dane",
    },
    error: {
      statusCode: 500,
      description: "Internal server error",
    },
  },


  fn: async function (inputs, exits) {
    const userid = this.req.user.id
    if ( !inputs.newAboutMe ) return exits.badInput({ message: "Złe dane" })
    User.findOne( { id: userid }, ).exec( (err, user) => { 
      if ( err ) return exits.error({ message: "Internal server error"} )
      if ( !user ) return exits.notAUser({ message: "Błąd weryfikacji JWT" })

      User.updateOne({ id: userid }, { aboutme: inputs.newAboutMe }).exec( err => {
        if (err) return exits.error({ message: "Wewnętrzny błąd serwera"})
        return exits.success({ message: "Pomyślnie zaaktualizowano aboutme"})
      })
    
    })
  }


};
