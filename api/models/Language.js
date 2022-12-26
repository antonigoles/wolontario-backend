/**
 * Language.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const utils = require("../../utils")

module.exports = {
  tableName: "Languages",
  attributes: {
    user: {
      model: 'user',
    },
    code: {
      type: 'string',
      isIn: utils.language.getLanguageCodes()
    },
    level: {
      type: 'string',
      isIn: [ 'A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'NATIVE' ]
    }
  },

};

