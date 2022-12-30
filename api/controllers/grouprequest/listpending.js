module.exports = {


  friendlyName: 'List Pending',


  description: 'List all pending group requests.',


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
      const requests = await GroupRequest.find({ status: 'PENDING' })

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
