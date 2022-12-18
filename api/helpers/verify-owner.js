const jwt = require('jsonwebtoken')

module.exports = {
  friendlyName: 'Verify account ownership',
  description: 'Verify account ownership.',
  inputs: {
    req: {
      type: 'ref',
      friendlyName: 'Request',
      description: 'A reference to the request object (req).',
      required: true
    },
    res: {
      type: 'ref',
      friendlyName: 'Response',
      description: 'A reference to the response object (res).',
      required: false
    }
  },
  exits: {
    invalid: {
      description: 'Invalid token or no authentication present.',
    },
    notAccountOwner: {
        description: 'JWT verification failed (email not equal).',
    }
  },
  fn: (inputs, exits) => {
    var req = inputs.req
    var res = inputs.res
    if (req.header('authorization')) {
      // if one exists, attempt to get the header data
      var token = req.header('authorization').split('Bearer ')[1]
      // if there's nothing after "Bearer", no go
      console.log(token)
      if (!token) return exits.invalid()
      // if there is something, attempt to parse it as a JWT token
      return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err || !payload.sub) return exits.invalid()
        if ( payload.sub != req.body.email ) 
        if (!user) return exits.notAccountOwner()
        return exits.success()
      })
    }
    return exits.invalid()
  }
}