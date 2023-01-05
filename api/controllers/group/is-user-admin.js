module.exports = {


  friendlyName: 'is User Admin',


  description: 'is user a group admin',


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
    error: {
      statusCode: 500,
      description: "Internal server error",
    },
  },


  fn: async function (_, exits) {
    try {
      const groupMember = this.req.groupMember;

      return exits.success({
          message: groupMember.isAdmin
      })

    } catch ( err ) {
      console.log(err)
      return exits.error({
        error: "Internal server error"
      })
    }
  }


};
