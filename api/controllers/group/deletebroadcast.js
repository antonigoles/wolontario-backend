module.exports = {


  friendlyName: 'DeleteBroadcast',


  description: 'Deletes a Broadcast.',


  inputs: {
    groupid: {
      type: 'string',
      required: true,
    },
    broadcastid: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    success: {
      statusCode: 200,
      description: "success",
    },
    broadcastNotInGroup: {
      statusCode: 404,
      description: "No such broadcast id in this group",
    },
    error: {
      statusCode: 500,
      description: "Internal server error",
    },
  },


  fn: async function (inputs, exits) {
    try {
      const { broadcastid, groupid } = inputs;
      const bc = await Broadcast.destroy({ id: broadcastid, group: groupid }).fetch();

      if ( !bc ) {
        return exits.broadcastNotInGroup({
          message: "W tej grupie nie ma ogłoszenia o takim id!"
        })
      } 

      return exits.success({
        message: "Pomyślnie usunięto",
      })

    } catch (error) {
      console.log(error)
      return exits.error({
        error: "Internal server error"
      })
    }

  }


};
