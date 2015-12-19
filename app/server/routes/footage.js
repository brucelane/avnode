var config = require('getconfig');
var Footage = require('../models/footage');
var _ = require('lodash');

exports.get = function get(req, res) {
	var params = _.filter(req.params, function(v, k) {
		return (k === 'filter' || k === 'page' || k === 'sorting');
	});
	var section = 'footage';
	var page = req.params.page || 1;
	var skip = (page - 1) * config.sections[section].limit;
	var filter = req.params.filter || config.sections[section].categories[0];
	var query = config.sections[section].searchQ[filter];
	var sorting = req.params.sorting || config.sections[section].orders[0];

  var path = '/' + section + '/' + _.map(req.params, function(p) { return p; }).join('/') + '/';
	path = path.replace('//', '/');

	Footage.count(query, function(error, total) {
		Footage.find(query)
		.limit(config.sections[section].limit)
		.skip(skip)
		.sort(config.sections[section].sortQ[sorting])
		.exec(function(error, footage) {
			res.render('list', {
				title: config.sections[section].title,
				sez: section,
				tot: total,
				path: path,
				sort: sorting,
				filter: filter,
				skip: skip,
				result: footage,
				user: req.user
			});
		});
	});
};
