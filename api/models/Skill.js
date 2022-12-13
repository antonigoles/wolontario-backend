/**
 * Skill.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Skills",
  attributes: {
    user: {
      model: 'user',
    },
    name: {
      type: 'string',
    },
    icon: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    level: {
      type: 'string',
    }
  },

};

