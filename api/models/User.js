/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Users",
  attributes: {
    name:                         { type: 'string', columnName: 'name', required: true },
    surname:                      { type: 'string', columnName: 'surname', required: true },
    email:                        { type: 'string', required: true, unique: true, },
    emailStatus:                  { type: 'string', isIn: ['unconfirmed', 'confirmed'], 
                                    defaultsTo: 'unconfirmed', columnName: 'email_status' },
    emailProofToken:              { type: 'string', columnName: 'email_proof_token' },
    emailProofTokenExpiresAt:     { type: 'number', columnName: 'email_proof_token_expires_at' },
    password:                     { type: 'string', required: true },
    passwordResetToken:           { type: 'string', columnName: 'password_reset_token', },
    passwordResetTokenExpiresAt:  { type: 'number', columnName: 'password_reset_token_expires_at', },
    
    taskReports: {
      collection: 'TaskReport',
      via: 'user'
    },

    assignedTasks: {
      collection: 'Task',
      via: 'assigned',
    },

    groups: {
      collection: 'group',
      via: 'user',
      through: 'groupmember'
    },

    joinRequests: {
      collection: 'joinRequest',
      via: 'user'
    },

    languages: {
      collection: 'language',
      via: 'user',
    },

    skills: {
      collection: 'skill',
      via: 'user',
    }

  },

  customToJson: function() {
    return _.omit(this, ["password"])
  }

};

