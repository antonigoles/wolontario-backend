module.exports = async function (req, res, next) {
    const userid = req.user.id;
    const groupid = req.allParams().groupid;

    console.log( groupid )

    const groupMember = await GroupMember.findOne({ 
        user: userid,
        group: groupid,
    })

    if ( !groupMember ) {
        console.log("Not found matching pair")
        return res.sendStatus(403)
    }

    req.groupMember = groupMember;

    return next()
};