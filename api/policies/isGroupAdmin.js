module.exports = async function (req, res, next) {
    const userid = req.user.id;
    const groupid = req.groupid;

    const groupMember = await GroupMember.findOne({ 
        user: userid,
        group: groupid,
        isAdmin: true,
    })

    if ( !groupMember ) {
        return res.sendStatus(403)
    }

    return next()
};