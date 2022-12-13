/**
 * Task.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Tasks",
  attributes: {
    group: {
      collection: 'group',
      via: 'tasks'
    },
    startTime: {
      type: 'number'
    },
    endTime: {
      type: 'number'
    },
    assigned: {
      collection: 'user',
      via: 'assignedTasks',
    },
    taskCategory: {
      model: 'TaskCategory'
    },
    taskReports: {
      collection: 'TaskReport',
      via: 'task'
    },
    subTasks: {
      collection: "SubTask"
    },
    isFinished: {
      type: 'boolean',
      defaultsTo: false,
    }
  },

};

