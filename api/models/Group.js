/**
 * Group.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Groups",
  attributes: {
    avatarUrl: {
      type: 'string',
      defaultsTo: "null"
    },

    name: {
      type: 'string',
    },

    orgName: {
      type: 'string',
    },

    avatarFd: {
      type: 'string',
      defaultsTo: "null"
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
      defaultsTo: 'Wroclaw',
    },

    tasks: {
      collection: 'task',
      via: 'group',
    },
    members: {
      collection: 'user',
      via: 'group',
      through: 'groupmember'
    },
    taskCategories: {
      collection: 'TaskCategory',
      via: 'group',
    },
    broadcasts: {
      collection: 'Broadcast',
      via: 'group'
    },
    adverts: {
      collection: 'advert',
      via: 'group'
    },
    joinRequests: {
      collection: 'JoinRequest',
      via: 'group'
    }
  },

};

