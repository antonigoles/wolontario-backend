module.exports = {


  friendlyName: 'Get profile',


  description: 'Get user profile',


  inputs: {
    email: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    success: {
      description: "User found",
    },
    notAUser: {
      statusCode: 404,
      description: "User not found",
    },
  },


  fn: async function (inputs, exits) {
    try {
      const user = await User.findOne({ email: inputs.email }).populate('skills')
      if ( !user ) {
        exits.notAUser({
          error: `An account belonging to ${inputs.email} was not found`,
        });
      }
      exits.success({
        data: user
      })
    }
    catch(error) {
      exits.error({
        error: error.message,
      })
    }
    
    // All done.
    return;

  }


};
