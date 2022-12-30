module.exports = {


  friendlyName: 'Avatar',


  description: 'Avatar something.',


  inputs: {
    userid: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    success: {
      description: "Login successful",
    },
    notAUser: {
      statusCode: 404,
      description: "Nie ma takiego uzytkownika",
    },
    noAvatar: {
      statusCode: 404,
      description: "Użytkownik nie ustawił jeszcze zdjęcia profilowego"
    },
    error: {
      statusCode: 500,
      description: "Internal server error",
    },
  },


  fn: async function (inputs, exits) {
    const res = this.res;
    User.findOne( { id: inputs.userid } ).exec( (err, user) => {
      if ( err ) return exits.error({ message: "Wewnętrzny problem serwera" })
      if ( !user ) return exits.notAUser({ message: "Nie ma takiego użytkownika" })

      if ( user.avatarFd == "null" ) {
        return exits.noAvatar({
          message: "Użytkownik nie ustawił jeszcze zdjęcia profilowego",
        })
      }

      const SkipperDisk = require('skipper-disk');
      const fileAdapter = SkipperDisk()

      res.set("Content-disposition", `attachment; filename=avatar-${user.id}.${ user.avatarImageType.split("/")[1]  }`);
      res.type( user.avatarImageType.split("/")[1] )
      fileAdapter.read(user.avatarFd)
        .on('error', (err) => {
          return exits.error({
            message: "Wewnętrzny problem serwera podczas strumieniowania pliku"
          })
        })
        .pipe(res)
    })

  }


};
