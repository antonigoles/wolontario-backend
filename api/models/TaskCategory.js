/**
 * TaskCategory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "TaskCategories",
  attributes: {
    group: {
      collection: 'group',
      via: 'taskCategories',
    },

    name: {
      type: 'string'
    },

    color: {
      type: 'string',
      defaultsTo: "#ffffff"
    }
  },

};

