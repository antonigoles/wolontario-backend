module.exports = async function (req, res, next) {
    try {
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

        req.groupMember = groupMember;

        return next()
    } catch( err ) {
        console.log(err)
        return res.sendStatus(500)
    }
    
};