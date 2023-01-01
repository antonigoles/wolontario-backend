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
      const requests = await GroupRequest.find({ status: 'PENDING' }).populate('createdBy')

      return exits.success({
        message: requests.map ( request => {
          return {
            ...request,
            createdBy: {
              name: request.createdBy.name,
              surname: request.createdBy.surname,
              trusted: request.createdBy.trusted,
            }
          }
        })
      })

    } catch(err) {
      console.log(err)
      return exits.error({
        error: "Internal server error"
      })
    }
  }


};
