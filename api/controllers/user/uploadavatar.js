module.exports = {


  friendlyName: 'Uploadavatar',


  description: 'Avatar upload.',

  files: ['avatar'],

  inputs: {
    avatar: {
      example: '===',
      required: true,
    },
  },


  exits: {
    success: {
      statusCode: 201,
      description: 'Avatar uploaded',
    },
    badFileType: {
      statusCode: 401,
      description: 'Typ pliku niedozwolony! (Tylko JPG/PNG)',
    },
    fileTooBig: {
      statusCode: 401,
      description: "Plik zbyt duży! (Max ~5MB)",
    },
    error: {
      statusCode: 400,
      description: 'Something went wrong',
    },
  },


  fn: async function (inputs, exits) {
    const req = this.req;
    const upload = req.file('avatar')._files[0].stream
    const byteCount = upload.byteCount;
    const allowedTypes = ['image/jpeg', 'image/png'];
    const headers = upload.headers;

    if ( !allowedTypes.includes( headers['content-type'] ) ) {
      return exits.badFileType({
        message: "Typ pliku niedozwolony! (Tylko JPG/PNG)"
      })
    }

    if ( byteCount > 5000000 ) {
      return exits.fileTooBig({
        message: "Plik zbyt duży! (Max ~5MB)"
      })
    } 

    await inputs.avatar.upload({
      maxBytes: 5000000,  
    },
      function (err, uploadedFiles) {
        if (err) {
          return exits.error({
            error: err.message,
          })
        }

        const baseUrl = sails.config.custom.baseUrl;
        User.updateOne( { email: req.user.email }, {
          avatarUrl: require('util').format('/user/avatar/%s', req.user.id ),
          avatarFd: uploadedFiles[0].fd,
          avatarImageType: headers['content-type'],
        }).exec( (err) => {
          if (err) return exits.error({message: "Wystapil blad w trakcie zapisywania zdjecia"})
          return exits.success({
            message: "Successfull avatar upload"
          })
        })    
      }
    );
    // return exits.error({
    //   message: `Upload failed`,
    // });

  }


};
