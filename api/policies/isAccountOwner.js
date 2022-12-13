module.exports = async function (req, res, next) {
    console.log(req)
    return next()
};