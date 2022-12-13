/**
 * Language.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const utils = require("../../utils")

console.log( utils.language.getLanguageCodes() )

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
    }
  },

};

