/**
 * Grouprequest.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "GroupRequest",
  attributes: {

    createdBy: {
      model: 'user',
    },

    name: {
      type: 'string'
    },

    orgName: {
      type: 'string'
    },

    verificationDescription: {
      type: 'string',
    },

    groupCategory: {
      type: 'string',
      defaultsTo: 'inne',
    },

    date: {
      type: 'number',
      defaultsTo: 0,
    },

    endsOn: {
      type: 'number',
      defaultsTo: 0,
    },

    description: {
      type: 'string',
      defaultsTo: ""
    },

    certificateAfter: {
      type: 'boolean',
      defaultsTo: false
    },

    location: {
      type: 'string',
      defaultsTo: 'Wroclaw'
    },

    status: {
      type: 'string',
      isIn: [ 'ACCEPTED', 'PENDING', 'DENIED' ],
      defaultsTo: 'PENDING',
    }

  },

};

