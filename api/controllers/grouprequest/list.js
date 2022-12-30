module.exports = {


  friendlyName: 'List',


  description: 'List group requests as user.',


  inputs: {

  },


  exits: {
    success: {
      message: "success",
    },
    error: {
      statusCode: 500,
      message: "Internal server error"
    }
  },


  fn: async function (_, exits) {
    try {
      const requests = await GroupRequest.find({ createdBy: this.req.user.id, })

      return exits.success({
        message: requests
      })

    } catch(err) {
      console.log(err)
      return exits.error({
        error: "Internal server error"
      })
    }
    

  }


};
