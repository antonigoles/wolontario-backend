/**
 * GroupMember.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "GroupMembers",
  attributes: {
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    user: {
      model: 'user'
    },
    group: {
      model: 'group'
    },
  },

};

