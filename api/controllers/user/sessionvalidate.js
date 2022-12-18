module.exports = {
    friendlyName: 'Validate session',
    description: 'Validate session.',

  
    inputs: {

    },
  
  
    exits: {
      success: {
        description: "Login successful",
      },
    },
  
  
    fn: async function (inputs, exits) {
        // if isAuthenticated policy passed then we're good
        exits.succes({
            message: "Valid"
        })
    }  
};
  