module.exports = {


  friendlyName: 'Create',


  description: 'Create grouprequest.',


  inputs: {
    name: {
      type: 'string',
      required: true,
    },

    orgName: {
      type: 'string',
      required: true,
    },

    verificationDescription: {
      type: 'string',
      required: true,
    },

    groupCategory: {
      type: 'string',
      required: true,
    },

    date: {
      type: 'number',
      required: true,
    },

    endsOn: {
      type: 'number',
      required: true,
    },

    description: {
      type: 'string',
      required: true,
    },

    certificateAfter: {
      type: 'boolean',
      required: true,
    },
  },


  exits: {
    success: {
      message: "success",
    },
    alreadyHasPendingRequest: {
      statusCode: 403,
      message: "Juz masz oczekujacy request",
    },
    error: {
      statusCode: 500,
      message: "Internal server error"
    }
  },


  fn: async function (inputs, exits) {
    try {
      const userid = this.req.user.id;
      const { name, orgName, verificationDescription, groupCategory, date, endsOn, description, certificateAfter } = inputs;
      
      let groupRequest = await GroupRequest.findOne({ createdBy: userid, status: 'PENDING' })

      if ( groupRequest ) {
        return exits.alreadyHasPendingRequest({
          error: "Użytkownik już ma jedną oczekującą prośbę",
        })
      }

      groupRequest = await GroupRequest.create({
        createdBy: userid, name, orgName, verificationDescription, groupCategory, 
        date, endsOn, description, certificateAfter 
      }).fetch()

      return exits.success({
        message: groupRequest,
      })

    } catch (err) {
      console.log(err)
      return exits.error({
        erorr: "Internal server error"
      })
    }
    

    
  }


};
