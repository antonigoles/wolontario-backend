module.exports = async function (req, res, next) {
    sails.helpers.verifyJwt.with({
        req: req,
        res: res
    }).switch({
        error: function (err) {
            return res.serverError(err)
        },
        invalid: function (err) {
            if (req.wantsJSON) {
                return res.sendStatus(401)
            }
            return res.sendStatus(403)
        },
        success: function () {
            return next()
        }
    })
  };