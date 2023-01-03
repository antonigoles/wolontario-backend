module.exports = {


  friendlyName: 'Avatar',


  description: 'Avatar group.',


  inputs: {
    groupid: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    success: {
      description: "Success"
    },
    notAGroup: {
      statusCode: 404,
      description: "Nie ma takiej grupy"
    },
    error: {
      statusCode: 500,
      description: "Internal server error"
    },
  },


  fn: async function (inputs, exits) {
    try {
      const res = this.res;
      const group = await Group.findOne( { id: inputs.groupid } );
      if ( !group ) return exits.notAGroup({ message: "Nie ma takiej grupy" })

      let path = group.avatarFd

      const SkipperDisk = require('skipper-disk');
      const fileAdapter = SkipperDisk()
      if ( group.avatarFd == "null" ) {
        path = require('path').join(__dirname, "/../../../assets/defaultgroup.png" )
        res.set("Content-disposition", `attachment; filename=avatar-defaultgroup  }`);
        res.type( "image/png" )
      } else {
        res.set("Content-disposition", `attachment; filename=avatar-${group.id}.${ group.avatarImageType.split("/")[1]  }`);
        res.type( group.avatarImageType.split("/")[1] )
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
