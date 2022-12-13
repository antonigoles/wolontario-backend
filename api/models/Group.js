/**
 * Group.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Groups",
  attributes: {
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
    announcements: {
      collection: 'announcement',
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

