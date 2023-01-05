module.exports = {


    friendlyName: 'blacklisttoken',

    description: 'Black list JWT token.',

    inputs: {
        email: {
            type: 'string',
            required: true,
        }
    },

    exits: {
        success: {
            description: "success",
        },

        accountDoesNotExist: {
            statusCode: 404,
            description: "Account does not exist"
        },

        accountAlreadyConfirmed: {
            statusCode: 403,
            description: "Account already confirmed",
        },
        cooldown: {
            statusCode: 400,
            description: "You need to wait"
        },
        error: {
            statusCode: 500,
            description: 'Internal server error'
        }
    },


    fn: async function (inputs, exits) {
        try {
            
            const emailAdress = inputs.email.toLowerCase();

            const user = await User.findOne({ email: emailAdress });

            if ( !user ) {
                return exists.accountDoesNotExist({
                    error: "Nie ma takiego konta",
                })
            }

            if ( user.emailStatus == 'confirmed' ) {
                return exits.accountAlreadyConfirmed({
                    error: 'Konto już zostało zweryfikowane',
                })
            }

            const FortyFiveSecs = 1000*45;
            const OneHour = 1000*60*60;

            if ( Date.now() - user.lastEmailSentAt < FortyFiveSecs ) {

                // miniscule amounts of trolling : )

                let timeLeft = (Date.now() - user.lastEmailSentAt) + 5000;

                await User.updateOne({ email: emailAdress }, {
                    lastEmailSentAt: user.lastEmailSentAt + 5000,
                })

                return exits.cooldown({
                    error: `Poczekaj jeszcze chwile!`,
                    timeLeft: timeLeft,
                })

                
            }

            

            const token = "XXXXXX".split("").map( e => Math.floor( Math.random() * 10 ) ).join("");

            await User.updateOne({ email: emailAdress }, {
                lastEmailSentAt: Date.now(),
                emailProofToken: token,
                emailProofTokenExpiresAt: Date.now() + OneHour,
            })

            const email = {
                to: user.email,
                subject: 'Potwierdź rejestracje',
                template: 'confirm',
                context: {
                  name: `${user.name} ${user.surname}`,
                  confirmCode: token,
                }
              }
        
            await sails.helpers.sendMail(email);

            return exits.success({
                message: 'Wysłano maila z nowym kodem'
            })

            
        } catch ( error ) {
            console.log(error)
            return exits.error({
                error: "Internal server error",
            });
        }
    }
};
