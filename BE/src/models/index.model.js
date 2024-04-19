const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.data = require("./data.model");
db.log = require("./log.model");

module.exports = db;