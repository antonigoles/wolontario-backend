require("dotenv").config();

module.exports.datastores = {
  default: {
    adapter: require('sails-mongo'),
    url: process.env.MONGO_URL,
  },
};
