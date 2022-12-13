/**
 * SubTask.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "SubTasks",
  attributes: {
    description: {
      type: "string"
    },
    finished: {
      type: "boolean",
      defaultsTo: false
    }
  },

};

