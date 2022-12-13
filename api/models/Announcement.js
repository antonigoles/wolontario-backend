/**
 * Announcement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Announcements",
  attributes: {
    group: {
      collection: 'group',
      via: 'announcements'
    },
    title: {
      type: 'string',
    },
    message: {
      type: 'string'
    }
  },

};

