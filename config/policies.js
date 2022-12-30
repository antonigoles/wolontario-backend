/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  "user/login": 'can-login',
  "user/get-profile": 'isAuthenticated',
  "user/uploadavatar": 'isAuthenticated',
  "user/skills": 'isAuthenticated',
  "user/updateskills": 'isAuthenticated',
  "user/updateaboutme": 'isAuthenticated',
  "user/langs": 'isAuthenticated',
  "user/updatelangs": 'isAuthenticated',
  'user/groups': "isAuthenticated",
  'group/add': ["isAuthenticated", "isGlobalAdmin"],
  'group/get': "isAuthenticated",
  'group/adduser': ["isAuthenticated", "isGlobalAdmin"],
  'grouprequest/updatestatus': ["isAuthenticated", "isGlobalAdmin"],
  'grouprequest/listpending': ["isAuthenticated", "isGlobalAdmin"],
  'grouprequest/list': "isAuthenticated",
  'grouprequest/create': "isAuthenticated",
  'user/blacklisttoken': "isAuthenticated",
};
