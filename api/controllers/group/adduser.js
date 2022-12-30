module.exports = {


  friendlyName: 'Adduser',


  description: 'Adduser group.',


  inputs: {
    userid: {
      type: 'string',
      required: true
    },
    groupid: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    success: {
      description: "Success",
    },

    userAlreadyPartOfGroup: {
      statusCode: 403,
      description: "Uzytkownik jest juz w tej grupie",
    },

    notAUser: {
      statusCode: 404,
      description: "Nie ma takiego uzytkownika",
    },
    notAGroup: {
      statusCode: 404,
      description: "Nie ma takiej grupy",
    },
    error: {
      statusCode: 500,
      description: "Internal server error",
    },
  },


  fn: async function (inputs, exits) {
    try {
      const groupid = inputs.groupid;
      const userid = inputs.userid;
      let group = await Group.findOne({ id: groupid })
      let user = await User.findOne({ id: userid })

      if ( !user ) {
        return exits.notAUser({
          message: "Nie ma takiego uzytkownika"
        })
      }

      if ( !group ) {
        return exits.notAGroup({
          message: "Nie ma takiej grupy"
        })
      }

      let groupMemeber = await GroupMember.findOne({ 
        user: userid, group: groupid
      })

      if ( groupMemeber ) {
        return exits.userAlreadyPartOfGroup({ 
          message: "Już należy do grupy" 
        })
      }

      // groupMemeber = await GroupMember.create({ 
      //   user: userid,
      //   group: groupid,
      // }).fetch();

      // await Group.addToCollection(groupid, 'members', groupMemeber.id)
      await User.addToCollection(userid, 'groups', groupid)

      return exits.success({
        message: groupMemeber
      })




    } catch ( err ) {
      console.log( err )
      return exits.error({ error: "Internal server error" })
    } 
  }


};
