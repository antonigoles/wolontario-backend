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

    // RCON
    'GET /rcon/showuser/': 'rcon/showuser',
    
    'PUT /rcon/setadmin/': 'rcon/setadmin',
    'PUT /rcon/deleteuser/': 'rcon/deleteuser',


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
    'POST /user/confirm-email/': 'user/confirm',
    'POST /user/reset-email-token/': 'user/resetemailtoken',

    'PUT /user/skills': 'user/updateskills',
    'PUT /user/langs': 'user/updatelangs',
    'PUT /user/aboutme': 'user/updateaboutme',

    // SKILLS
    'POST /skills/': 'skills/add',

    // GROUP
    'GET /group/get/:groupid': "group/get",
    'GET /group/avatar/:groupid': "group/avatar",
    'GET /group/list': "group/list",
    'GET /group/is-user-admin/:groupid': "group/is-user-admin",
    'GET /group/broadcasts/:groupid': 'group/broadcasts',

    'POST /group/': 'group/add', 
    'POST /group/member': 'group/adduser',
    'POST /group/broadcast': 'group/postbroadcast',


    'DELETE /group/broadcast/': 'group/deletebroadcast',
    
    // GROUP REQUEST
    'GET /grouprequest/pending': 'grouprequest/listpending',
    'GET /grouprequest/list': 'grouprequest/list',

    'POST /grouprequest/': 'grouprequest/create',
    'PUT /grouprequest/updatestatus': 'grouprequest/updatestatus',
    


};
