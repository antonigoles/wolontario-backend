/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {



    "GET /": "home/index",

    'GET /user/profile/:userid': 'user/get-profile',
    'GET /user/confirm': 'user/confirm',
    'GET /user/avatar/:userid': 'user/avatar',
    'POST /user/register': 'user/register',
    'POST /user/login': 'user/login',
    'POST /user/upload-avatar': 'user/uploadavatar',

    'POST /skills/': 'skills/add',

    
    


};
