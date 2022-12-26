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
    'GET /user/skills': 'user/skills',

    'POST /user/register': 'user/register',
    'POST /user/login': 'user/login',
    'POST /user/upload-avatar': 'user/uploadavatar',

    'PUT /user/skills': 'user/updateskills',
    'PUT /user/aboutme': 'user/updateaboutme',


    'POST /skills/': 'skills/add',

    
    


};
