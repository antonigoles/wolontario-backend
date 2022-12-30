module.exports = {


  friendlyName: 'Groups',
  description: `Lists user's groups.`,


  exits: {
    success: {
      description: "success",
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
    const id = this.req.user.id;
    User.findOne({ id: id }).populate('groups').exec( (err, user) => {
      if ( err ) return exits.error({ message: "Internal server error" })
      if ( !user ) return exits.notAUser({ message: "Nie znaleziono użytkownika" })

      return exits.success({
        message: user.groups.map( group => { 
          return {
            id: group.id,
            name: group.name,
            orgName: group.orgName,
            avatarUrl: group.avatarUrl,
          }
        })
      })

    })
  }


};
