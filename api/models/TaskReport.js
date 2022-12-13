/**
 * TaskReport.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "TaskReports",
  attributes: {
    user: {
      model: 'user',
    },
    task: {
      collection: 'task',
      via: 'taskReports'
    },
    message: {
      type: "string"
    }
  },

};

