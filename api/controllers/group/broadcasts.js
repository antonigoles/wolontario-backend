module.exports = {


  friendlyName: 'Broadcasts',


  description: 'Group Broadcasts.',


  inputs: {
    groupid: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    success: {
      statusCode: 200,
      description: "success",
    },
    error: {
      statusCode: 500,
      description: "Internal server error",
    },
  },


  fn: async function (inputs, exits) {
    try {
      const groupid = inputs.groupid;

      const anns = await Group.findOne({ id: groupid }).populate('broadcasts');


      return exits.success({
        message: anns["broadcasts"].sort( (a,b) => b.createdAt - a.createdAt ),
      })

    } catch (error) {
      console.log(error)
      return exits.error({
        error: "Internal server error"
      })
    }

  }


};
