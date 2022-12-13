/**
 * Advert.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Adverts",
  attributes: {
    group: {
      collection: 'group',
      via: 'adverts'
    },
    date: { type: 'number' },
    timespan: { type: 'number' },
    organization: { type: 'string', },
    location: { type: 'string' },
    certificate: { type: 'boolean', },
    tags: { type: "string" },
    description: { type: "string" },
    requirements: { type: "string" },
    contactDescription: { type: "string" },
    contactPhone: { type: "string" },
    contactEmail: { type: "string" },
    contactWebsite: { type: "string" },
  },

};

