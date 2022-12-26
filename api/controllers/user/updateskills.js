module.exports = {


  friendlyName: 'Updateskills',


  description: 'Updateskills user.',


  inputs: {
    newSkillsArray: {
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
    User.findOne( { id: userid }, ).exec( (err, user) => { 
      if ( err ) return exits.error({ message: "Internal server error"} )
      if ( !user ) return exits.notAUser({ message: "Błąd weryfikacji JWT" })
      
      
      console.log( inputs.newSkillsArray )

      // verify new Skills array
      if ( !Array.isArray(inputs.newSkillsArray) ) 
        return exits.incorrectInput({ message: "Zły format, nie przekazano listy" })

      const parsed = inputs.newSkillsArray.map( skill => {
        return { 
          name: skill["name"], 
          description: skill["description"], 
          level: skill["level"],
        }
      } )

      console.log(parsed)

      for ( const skill of parsed ) {
        if (  skill["name"] == undefined || skill["description"] == undefined || skill["level"] == undefined ) {
          return exits.incorrectInput({ message: "Zły format, nie przekazano odpowiednich danych" })
        }
      }

      User.updateOne({ id: userid }, { skills: parsed }).exec( err => {
        if (err) return exits.error({ message: "Wewnętrzny błąd serwera"})
        return exits.success({ message: "Pomyślnie zaaktualizowano umiejętności"})
      })
      

    })
  }


};
