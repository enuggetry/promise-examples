var promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
fs.readFileAsync("name", "utf8").then(function(data) {

});


var request = Promise.promisify(require("request"));
