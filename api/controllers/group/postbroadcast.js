module.exports = {


  friendlyName: 'PostBroadcast',


  description: 'post broadcast.',


  inputs: {
    groupid: {
      type: 'string',
      required: true,
    },
    title: {
      type: 'string',
      required: true,
    },
    message: {
      type: 'string',
      required: true,
    }
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
      const { groupid, title, message } = inputs;
      const ann = await Broadcast.create({
        group: groupid,
        title,
        message,
      }).fetch();

      return exits.success({
        message: ann,
      })

    } catch (error) {
      console.log(error)
      return exits.error({
        error: "Internal server error"
      })
    }

  }


};
