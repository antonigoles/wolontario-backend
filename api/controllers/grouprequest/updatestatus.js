module.exports = {


  friendlyName: 'Update status',


  description: 'Update status.',


  inputs: {
    requestId: {
      type: 'string',
      required: true,
    },
    status: {
      type: 'string',
      required: true,
      isIn: ['ACCEPTED','DENIED']
    }
  },


  exits: {
    success: {
      description: "success",
    },
    requestAlreadyUpdated: {
      statusCode: 401,
      description: "Prosba zostala juz zaakceptowana lub odrzucona",
    },
    requestDoesNotExist: {
      statusCode: 404,
      description: "Nie ma takiej prosby",
    },
    error: {
      statusCode: 500,
      description: "Internal server error" 
    }
  },


  fn: async function (inputs, exits) {
    try {

      const request = await GroupRequest.findOne({ id: inputs.requestId })

      if ( !request ) {
        return exits.requestDoesNotExist({
          error: "Prosba nie istnieje"
        })
      }

      if ( request.status != 'PENDING' ) {
        return exits.requestAlreadyUpdated({
          error: `Prosba juz zostala ${ request.status == 'ACCEPTED' ? 'zaakceptowana' : 'oddalona' }`
        })
      }

      const updated = await GroupRequest.updateOne({ id: inputs.requestId }, {
        status: inputs.status,
      })

      if ( inputs.status == 'DENIED' ) {
        return exits.success({
          message: "Pomyślnie odmówiono utworzenia grupy"
        })
      }

      const newGroup = await Group.create({
        name: updated.name, 
        orgName: updated.orgName,
        verificationDescription: updated.verificationDescription,
        groupCategory: updated.groupCategory,
        date: updated.date,
        endsOn: updated.endsOn,
        description: updated.description,
        certificateAfter: updated.certificateAfter,
        location: updated.location
      }).fetch()

      await Group.addToCollection( newGroup.id, 'members', updated.createdBy )
      await GroupMember.updateOne({ group: newGroup.id, user: updated.createdBy }, {
        isAdmin: true
      })

      return exits.success({
        message: "Pomyślnie zaakceptowano utworzenie grupy"
      })
      
    } catch (err) {
      console.log(err)
      return exits.error({
        error: "Internal server error"
      })
    }

  }


};
