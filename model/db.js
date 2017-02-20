var config = require('../config/prod.js');
var mongoose = require('mongoose');

mongoose.connect(config.database.conn(config.database.options));