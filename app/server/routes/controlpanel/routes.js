var express = require('express');
var router = express.Router();

var passport = require('passport');

var login = require('./login');
var confirm = require('./confirm');
var logout = require('./logout');
var signup = require('./signup');
var user = require('./user');
var crews = require('./crews');
var events = require('./events');
var validateParams = require('../../validation.js').validateParams;
var validateBody = require('../../validation.js').validateBody;

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/controlpanel/login',
    successRedirect: '/controlpanel/user'
  })
);
router.get('/login', login.get);

router.get('/login/facebook',
    passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    })
);
router.get('/login/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/controlpanel/user',
        failureRedirect: '/controlpanel/login'
    })
);

router.get('/login/twitter',
    passport.authenticate('twitter')
);
router.get('/login/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/controlpanel/user',
        failureRedirect: '/controlpanel/login'
    })
);

router.get('/login/google',
    passport.authenticate('google', { scope: ['email','profile'] })
);
router.get('/login/google/callback',
    passport.authenticate('google', {
        successRedirect: '/controlpanel/user',
        failureRedirect: '/controlpanel/login'
    })
);

router.get('/logout', logout.get);

router.get('/signup/', signup.get);
router.post('/signup/', signup.post);

router.get('/confirm', confirm.get);

// FIXME
router.use('/*', function(req, res, next) {
  if (!req.user) {
    res.redirect('/controlpanel/login');
  } else {
    next();
  }
});

router.get('/user/public', user.publicGet);
router.post('/user/public', validateBody(user.publicSchemaPost), user.publicPost);
router.get('/user', function(req, res) {
  res.redirect('/controlpanel/user/public');
});

router.get('/user/image', user.imageGet);
router.post('/user/image', validateBody(user.imageSchemaPost), user.imagePost);

router.get('/user/password', user.passwordGet);
router.post('/user/password', validateBody(user.passwordSchemaPost), user.passwordPost);

router.get('/user/private', user.privateGet);
router.post('/user/private', validateBody(user.privateSchemaPost), user.privatePost);

router.get('/user/emails', user.emailsGet);
router.post('/user/emails', validateBody(user.emailsSchemaPost), user.emailsPost);

router.get('/user/connections', user.connectionsGet);
router.post('/user/connections', validateBody(user.connectionsSchemaPost), user.connectionsPost);

router.get('/crews/:crew/public', validateParams(crews.publicSchemaGet), crews.publicGet);
router.post('/crews/:crew/public', validateBody(crews.publicSchemaPost), crews.publicPost);

router.get('/crews/:crew/image', validateParams(crews.imageSchemaGet), crews.imageGet);
router.post('/crews/:crew/image', validateBody(crews.imageSchemaPost), crews.imagePost);

router.get('/crews/:crew/members', validateParams(crews.membersSchemaGet), crews.membersGet);
router.post('/crews/:crew/members', validateBody(crews.membersSchemaPost), crews.membersPost);

router.get('/crews/list', crews.listGet);
router.get('/crews', function(req, res) {
  res.redirect('/controlpanel/crews/list');
});

router.get('/events/:event/public', validateParams(events.publicSchemaGet), events.publicGet);
router.post('/events/:event/public', validateBody(events.publicSchemaPost), events.publicPost);

router.get('/events/:event/image', validateParams(events.imageSchemaGet), events.imageGet);
router.post('/events/:event/image', validateBody(events.imageSchemaPost), events.imagePost);

router.get('/events/:event/visibility', validateParams(events.visibilitySchemaGet), events.visibilityGet);
router.post('/events/:event/visibility', validateBody(events.visibilitySchemaPost), events.visibilityPost);

router.get('/events/:event/permissions', validateParams(events.permissionsSchemaGet), events.permissionsGet);
router.post('/events/:event/permissions', validateBody(events.permissionsSchemaPost), events.permissionsPost);

router.get('/events/:event/calls', validateParams(events.callsSchemaGet), events.callsGet);
router.post('/events/:event/calls', validateBody(events.callsSchemaPost), events.callsPost);

router.get('/events/list', events.listGet);
router.get('/events', function(req, res) {
  res.redirect('/controlpanel/events/list');
});

router.get('/events/:event/calls/new', validateParams(events.newCallSchemaGet), events.newCallGet);
router.get('/events/:event/calls/:call/delete', validateParams(events.deleteCallSchemaGet), events.deleteCallGet);
router.get('/events/:event/calls/:call', validateParams(events.editCallSchemaGet), events.editCallGet);
router.post('/events/:event/calls/:call', validateBody(events.editCallSchemaPost), events.editCallPost);
router.get('/events', events.listGet);

module.exports = router;
