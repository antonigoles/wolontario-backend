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

    // USER
    'GET /user/profile/:userid': 'user/get-profile',
    'GET /user/confirm': 'user/confirm',
    'GET /user/avatar/:userid': 'user/avatar',
    'GET /user/skills': 'user/skills',
    'GET /user/langs': 'user/langs',
    'GET /user/groups': 'user/groups',

    'POST /user/register': 'user/register',
    'POST /user/login': 'user/login',
    'POST /user/upload-avatar': 'user/uploadavatar',
    'POST /user/blacklisttoken/': 'user/blacklisttoken',

    'PUT /user/skills': 'user/updateskills',
    'PUT /user/langs': 'user/updatelangs',
    'PUT /user/aboutme': 'user/updateaboutme',

    // SKILLS
    'POST /skills/': 'skills/add',

    // GROUP
    'GET /group/:groupid': "group/get",

    'POST /group/': 'group/add', 
    'POST /group/member': 'group/adduser',

    
    // GROUP REQUEST
    'GET /grouprequest/pending': 'grouprequest/listpending',
    'GET /grouprequest/list': 'grouprequest/list',

    'POST /grouprequest/': 'grouprequest/create',
    'PUT /grouprequest/updatestatus': 'grouprequest/updatestatus',
    


};
