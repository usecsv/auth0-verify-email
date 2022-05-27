/**
@param {object} user - The user being created
@param {string} user.id - user id
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} user.user_metadata - user metadata
@param {object} user.app_metadata - application metadata
@param {object} context - Auth0 connection and other context info
@param {string} context.requestLanguage - language of the client agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/
const axios = require("axios");

module.exports = function (user, context, cb) {
  if (user.emailVerified) return cb();
  axios
    .post("{domain}/api/user/send-verfication-email", { id: "auth0|" + user.id })
    .then((res) => {
      cb();
    })
    .catch((err) => {
      return cb("failed to email user");
    });
  // Perform any asynchronous actions, e.g. send notification to Slack.
};
