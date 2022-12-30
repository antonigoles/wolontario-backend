module.exports = {


  friendlyName: 'Add',


  description: 'Add group.',


  inputs: {
    name: {
      type: 'string',
      required: true,
    },
    orgName: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    success: {
      statusCode: 201,
      description: 'New user created',
    },
    error: {
      description: 'Something went wrong',
    },
  },


  fn: async function (inputs, exits) {
    try {
      const groupName = inputs.name
      const orgName = inputs.orgName

      let newGroup = await Group.create({
        name: groupName,
        orgName: orgName,
      }).fetch();

      return exits.success({ message: newGroup })

    } catch ( err ) {
      return exits.error({ message: "Internal server error" })
    } 

  }


};
