/**
 * Announcement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Broadcast",
  attributes: {
    group: {
      model: 'group',
    },
    title: {
      type: 'string',
    },
    message: {
      type: 'string'
    }
  },

};

