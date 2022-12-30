module.exports = async function (req, res, next) {
    const id = req.user.id;
    User.findOne({ id: id }).exec( (err, user) => {
        if ( err ) 
            return res.serverError({ error: "Internal server error" })
        if ( !user )
            return res.sendStatus(404)
        if ( user.isGlobalAdmin ) return next()

        return res.sendStatus(403)
    })
  };