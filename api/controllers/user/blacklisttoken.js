module.exports = {


    friendlyName: 'blacklisttoken',

    description: 'Black list JWT token.',



    exits: {
        success: {
            description: "success",
        },
        error: {
            statusCode: 500,
            description: 'Internal server error'
        }
    },


    fn: async function (_, exits) {
        try {
            const blacklist = await BlacklistedToken.create({
                jwtToken: this.req.token,
            }).fetch();

            return exits.success({
                message: blacklist
            })
            
        } catch ( error ) {
            return exits.error({
                error: "Internal server error",
            });
        }
    }
};
