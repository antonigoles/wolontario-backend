module.exports = {


  friendlyName: 'Get',


  description: 'Get group.',


  inputs: {
    groupid: {
      type: 'string',
      required: true,
    }
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


  fn: async function (inputs) {
    const userid = this.req.user.id
    const groupid = inputs.groupid
    const groupMemberObject = await GroupMember.findOne({ user: userid, group: groupid }).populate('group')
  
  
  }


};
