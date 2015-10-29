var DB = require('../modules/db-manager');
var Fnc = require('../modules/general-functions');
var config = require('getconfig');

exports.get = function get(req, res) {
	var sez = "footage";
	Fnc.getList(req.params[0], sez, res, 0, function(err, tot, records, conf){
		res.render("list", {title:config.sections[sez].title, sez:sez, tot:tot, path:conf.path, sort:conf.sort, filter:conf.filter, skip:conf.skip, result:records, Fnc:Fnc, user : req.session.passport.user});
	});
};
