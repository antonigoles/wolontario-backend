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
      description: "Użytkownik nie ustawil jeszcze zdjecia profilowego"
    },
    error: {
      statusCode: 500,
      description: "Internal server error",
    },
  },


  fn: async function (inputs, exits) {
    try {
      const res = this.res;
      const user = await User.findOne( { id: inputs.userid } );
      if ( !user ) return exits.notAUser({ message: "Nie ma takiego użytkownika" })

      let path = user.avatarFd

      const SkipperDisk = require('skipper-disk');
      const fileAdapter = SkipperDisk()
      if ( user.avatarFd == "null" ) {
        path = require('path').join(__dirname, "/../../../assets/noavatar.jpg" )
        res.set("Content-disposition", `attachment; filename=avatar-noavatar  }`);
        res.type( "image/jpeg" )
      } else {
        res.set("Content-disposition", `attachment; filename=avatar-${user.id}.${ user.avatarImageType.split("/")[1]  }`);
        res.type( user.avatarImageType.split("/")[1] )
      }   


      fileAdapter.read(path)
        .on('error', (err) => {
          return exits.error({
            message: "Wewnętrzny problem serwera podczas strumieniowania pliku"
          })
        }).pipe(res)

    } catch ( err ) {
      console.log(err)
      return exits.error({
        error: "Intrenal server error"
      })
    }
  }


};
