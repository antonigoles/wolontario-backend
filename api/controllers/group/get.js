module.exports = {


    friendlyName: 'Get',
  
  
    description: 'Get groups.',
  
  
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
  
  
    fn: async function (inputs, exits) {
      try {
        const groupid = inputs.groupid
        const group = await Group.findOne({ id: groupid });
        
        return exits.success({
            message: group,
        })
  
      } catch ( err ) {
        return exits.error({
          error: "Internal server error"
        })
      }
    }
  
  
  };
  