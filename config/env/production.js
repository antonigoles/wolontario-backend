require("dotenv").config()



module.exports = {

  datastores: {

    default: {
      adapter: require('sails-mongo'),
      url: process.env.MONGO_URL,

    },

  },



  models: {

    migrate: 'safe',


  },

  blueprints: {
    shortcuts: false,
  },

  security: {

    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
    },

  },



  session: {

    /***************************************************************************
    *                                                                          *
    * Production session store configuration.                                  *
    *                                                                          *
    * Uncomment the following lines to finish setting up a package called      *
    * "@sailshq/connect-redis" that will use Redis to handle session data.     *
    * This makes your app more scalable by allowing you to share sessions      *
    * across a cluster of multiple Sails/Node.js servers and/or processes.     *
    * (See http://bit.ly/redis-session-config for more info.)                  *
    *                                                                          *
    * > While @sailshq/connect-redis is a popular choice for Sails apps, many  *
    * > other compatible packages (like "connect-mongo") are available on NPM. *
    * > (For a full list, see https://sailsjs.com/plugins/sessions)            *
    *                                                                          *
    ***************************************************************************/
    // adapter: '@sailshq/connect-redis',
    // url: 'redis://user:password@localhost:6379/databasenumber',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking it in to version control, you might opt to
    // ||   set sensitive credentials like this using an environment variable.
    //
    // For example:
    // ```
    // sails_session__url=redis://admin:myc00lpAssw2D@bigsquid.redistogo.com:9562/0
    // ```
    //
    //--------------------------------------------------------------------------

    /***************************************************************************
    *                                                                          *
    * Production configuration for the session ID cookie name.                 *
    *                                                                          *
    * We reccomend prefixing your session cookie with `__Host-`, this limits   *
    * the scope of your cookie to a single origin to protect against same-site *
    * attacks.                                                                 *
    *                                                                          *
    * Note that with the `__Host-` prefix, session cookies will _not_ be sent  *
    * unless `sails.config.cookie.secure` is set to `true`.                    *
    *                                                                          *
    * Read more:                                                               *
    * https://sailsjs.com/config/session#?the-session-id-cookie                *
    *                                                                          *
    ***************************************************************************/
    // name: '__Host-sails.sid',

    /***************************************************************************
    *                                                                          *
    * Production configuration for the session ID cookie.                      *
    *                                                                          *
    * Tell browsers (or other user agents) to ensure that session ID cookies   *
    * are always transmitted via HTTPS, and that they expire 24 hours after    *
    * they are set.                                                            *
    *                                                                          *
    * Note that with `secure: true` set, session cookies will _not_ be         *
    * transmitted over unsecured (HTTP) connections. Also, for apps behind     *
    * proxies (like Heroku), the `trustProxy` setting under `http` must be     *
    * configured in order for `secure: true` to work.                          *
    *                                                                          *
    * > While you might want to increase or decrease the `maxAge` or provide   *
    * > other options, you should always set `secure: true` in production      *
    * > if the app is being served over HTTPS.                                 *
    *                                                                          *
    * Read more:                                                               *
    * https://sailsjs.com/config/session#?the-session-id-cookie                *
    *                                                                          *
    ***************************************************************************/
    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },

  },



  /**************************************************************************
  *                                                                          *
  * Set up Socket.io for your production environment.                        *
  *                                                                          *
  * (https://sailsjs.com/config/sockets)                                     *
  *                                                                          *
  * > If you have disabled the "sockets" hook, then you can safely remove    *
  * > this section from your `config/env/production.js` file.                *
  *                                                                          *
  ***************************************************************************/
  sockets: {

    /***************************************************************************
    *                                                                          *
    * Uncomment the `onlyAllowOrigins` whitelist below to configure which      *
    * "origins" are allowed to open socket connections to your Sails app.      *
    *                                                                          *
    * > Replace "https://example.com" etc. with the URL(s) of your app.        *
    * > Be sure to use the right protocol!  ("http://" vs. "https://")         *
    *                                                                          *
    ***************************************************************************/
    // onlyAllowOrigins: [
    //   'https://example.com',
    //   'https://staging.example.com',
    // ],


    /***************************************************************************
    *                                                                          *
    * If you are deploying a cluster of multiple servers and/or processes,     *
    * then uncomment the following lines.  This tells Socket.io about a Redis  *
    * server it can use to help it deliver broadcasted socket messages.        *
    *                                                                          *
    * > Be sure a compatible version of @sailshq/socket.io-redis is installed! *
    * > (See https://sailsjs.com/config/sockets for the latest version info)   *
    *                                                                          *
    * (https://sailsjs.com/docs/concepts/deployment/scaling)                   *
    *                                                                          *
    ***************************************************************************/
    // adapter: '@sailshq/socket.io-redis',
    // url: 'redis://user:password@bigsquid.redistogo.com:9562/databasenumber',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking it in to version control, you might opt to
    // ||   set sensitive credentials like this using an environment variable.
    //
    // For example:
    // ```
    // sails_sockets__url=redis://admin:myc00lpAssw2D@bigsquid.redistogo.com:9562/0
    // ```
    //--------------------------------------------------------------------------

  },



  /**************************************************************************
  *                                                                         *
  * Set the production log level.                                           *
  *                                                                         *
  * (https://sailsjs.com/config/log)                                        *
  *                                                                         *
  ***************************************************************************/
  log: {
    level: 'debug'
  },



  http: {

    /***************************************************************************
    *                                                                          *
    * The number of milliseconds to cache static assets in production.         *
    * (the "max-age" to include in the "Cache-Control" response header)        *
    *                                                                          *
    * If you are caching assets with a tool like Cloudflare, you may want to   *
    * reduce this considerably to allow more flexibility in purging the cache. *
    *                                                                          *
    ***************************************************************************/
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year

    /***************************************************************************
    *                                                                          *
    * Proxy settings                                                           *
    *                                                                          *
    * If your app will be deployed behind a proxy/load balancer - for example, *
    * on a PaaS like Heroku - then uncomment the `trustProxy` setting below.   *
    * This tells Sails/Express how to interpret X-Forwarded headers.           *
    *                                                                          *
    * This setting is especially important if you are using secure cookies     *
    * (see the `cookies: secure` setting under `session` above) or if your app *
    * relies on knowing the original IP address that a request came from.      *
    *                                                                          *
    * (https://sailsjs.com/config/http)                                        *
    *                                                                          *
    ***************************************************************************/
    // trustProxy: true,

  },



  /**************************************************************************
  *                                                                         *
  * Lift the server on port 80.                                             *
  * (if deploying behind a proxy, or to a PaaS like Heroku or Deis, you     *
  * probably don't need to set a port here, because it is oftentimes        *
  * handled for you automatically.  If you are not sure if you need to set  *
  * this, just try deploying without setting it and see if it works.)       *
  *                                                                         *
  ***************************************************************************/
  // port: 80,



  /**************************************************************************
  *                                                                         *
  * Configure an SSL certificate                                            *
  *                                                                         *
  * For the safety of your users' data, you should use SSL in production.   *
  * ...But in many cases, you may not actually want to set it up _here_.    *
  *                                                                         *
  * Normally, this setting is only relevant when running a single-process   *
  * deployment, with no proxy/load balancer in the mix.  But if, on the     *
  * other hand, you are using a PaaS like Heroku, you'll want to set up     *
  * SSL in your load balancer settings (usually somewhere in your hosting   *
  * provider's dashboard-- not here.)                                       *
  *                                                                         *
  * > For more information about configuring SSL in Sails, see:             *
  * > https://sailsjs.com/config/*#?sailsconfigssl                          *
  *                                                                         *
  **************************************************************************/
  // ssl: undefined,



  /**************************************************************************
  *                                                                         *
  * Production overrides for any custom settings specific to your app.      *
  * (for example, production credentials for 3rd party APIs like Stripe)    *
  *                                                                         *
  * > See config/custom.js for more info on how to configure these options. *
  *                                                                         *
  ***************************************************************************/
  custom: {
    baseUrl: 'https://example.com',
    internalEmailAddress: 'support@example.com',

    // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
    // stripeSecret: 'sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking them in to version control, you might opt to
    // ||   set sensitive credentials like these using environment variables.
    //
    // For example:
    // ```
    // sendgridSecret=SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU
    // sails_custom__stripeSecret=sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm
    // ```
    //--------------------------------------------------------------------------

  },



};
