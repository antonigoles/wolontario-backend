/**
 * JoinRequest.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "JoinRequests",
  attributes: {
    user: {
      collection: 'user',
      via: "joinRequests",
    },

    group: {
      collection: 'group',
      via: 'joinRequests'
    },

    accepted: {
      type: 'boolean',
      defaultsTo: false,
    }

  },
};

