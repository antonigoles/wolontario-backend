module.exports = {


  friendlyName: 'Get',


  description: 'Get groups.',


  inputs: {

  },


  exits: {
    success: {
      description: "success",
    },
    notAUser: {
      statusCode: 404,
      description: "Nie ma takiego uzytkownika",
    },
    notAGroup: {
      statusCode: 404,
      description: "Nie ma takiej grupy",
    },
    notAPartOfGroup: {
      statusCode: 404,
      description: "Użytkownik nie jest członkiem tej grupy",
    },
    error: {
      statusCode: 500,
      description: "Internal server error",
    },
  },


  fn: async function (inputs, exits) {
    try {
      const userid = this.req.user.id
      const groupMemberObject = await User.findOne({ id: userid }).populate('groups');

      return exits.success({
        message: groupMemberObject.groups.map( group =>
        {
          return {
            "id": group.id,
            "name": group.name,
            "orgName": group.orgName,
            "avatarUrl": group.avatarUrl,
          }
        }),
      })

      return 
    } catch ( err ) {
      return exits.error({
        error: "Internal server error"
      })
    }
  }


};
