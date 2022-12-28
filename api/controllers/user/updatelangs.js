const utils = require("../../../utils")

module.exports = {


  friendlyName: 'Updatelangs',


  description: 'Updatelangs user.',


  inputs: {
    newLangsArray: {
      type: 'json',
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
    incorrectInput: {
      status: 401,
      description: "Zly format",
    },
    error: {
      statusCode: 500,
      description: "Internal server error",
    },
  },


  fn: async function (inputs, exits) {
    const userid = this.req.user.id
    const acceptedCodes = utils.language.getLanguageCodes()
    const skillLevels = utils.language.getAcceptedSkillLevels()

    User.findOne( { id: userid }, ).exec( (err, user) => { 
      if ( err ) return exits.error({ message: "Internal server error"} )
      if ( !user ) return exits.notAUser({ message: "Błąd weryfikacji JWT" })
      

      // verify new Skills array
      if ( !Array.isArray(inputs.newLangsArray) ) 
        return exits.incorrectInput({ message: "Zły format, nie przekazano listy" })

      const parsed = inputs.newLangsArray.map( lang => {
        return { 
          code: lang["code"],
          level: lang["level"],
        }
      } )


      for ( const lang of parsed ) {
        if (  !acceptedCodes.includes(lang["code"]) || !skillLevels.includes(lang["level"]) ) {
          return exits.incorrectInput({ message: "Zły format, nie przekazano odpowiednich danych" })
        }
      }

      User.updateOne({ id: userid }, { languages: parsed }).exec( err => {
        if (err) return exits.error({ message: "Wewnętrzny błąd serwera"})
        return exits.success({ message: "Pomyślnie zaaktualizowano języki"})
      })
      

    })

  }


};
