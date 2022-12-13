/**
 * GroupMember.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "GroupMembers",
  attributes: {
    user: {
      model: 'user'
    },
    group: {
      model: 'group'
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    }
  },

};

