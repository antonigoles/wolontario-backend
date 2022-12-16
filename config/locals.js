var fs = require('fs');

module.exports = {

    ssl : {
        key: fs.readFileSync('path-to-key.key'),
       cert: fs.readFileSync('path-to-crt.crt')
    }

};