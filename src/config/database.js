require('dotenv').config()

module.exports = {
    MONGO_PASS: process.env.MONGO_PASS,
    MONGO_LOGIN: process.env.MONGO_LOGIN,
    MONGO_URL: process.env.MONGO_URL,
}