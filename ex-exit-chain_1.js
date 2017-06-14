/*
 * demonstrates promise chain - premature exit using throw
 * 
 * The exit handler must inherit from Error.  Thus, the catch all would not be called.
 * 
 * ref: https://www.sitepoint.com/simple-inheritance-javascript/
 */

var promise = require('bluebird');
var fs = promise.promisifyAll(require("fs"));
var request = promise.promisifyAll(require("request"));

var r1, r2, r3;


// the trick - setup myExitHandler inheritence of Error (filter handlers must do this)

var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};
var myExitHandler = function(param) {
    console.log("myExitHandler",param);
}
inheritsFrom(myExitHandler, Error);





// start promise chain

console.log('step 1');
fs.readFileAsync("myfile.json", "utf8").then(function(data) {
    r1 = data;

    // just unplug your network to make this fail.

    console.log('step 2');
    var url = 'https://rawgit.com/enuggetry/promise-examples/master/myfile.json';
    return request.getAsync({url:url,json:true});
}).then(function(data2) {
    r2 = data2.body;

    console.log("statusCode",data2.statusCode,"statusMessage",data2.statusMessage);

    // premature exit <-------------------------------------
    throw new myExitHandler('myParameter');

    // delete this file to make this fail
    console.log('step 3');

    return fs.readFileAsync("myfile_1.json", "utf8");
}).then(function(data3) {
    r3 = JSON.parse(data3);

    // can access r1 or r2 or r3
    console.log("complete");
     
}).catch(myExitHandler, function(e) {   // special handler
    console.log('catch myExitHandler');

}).catch(function(err){                 // catch all errors
    console.log('catch-all error',err);

}).finally(function() {
    console.log('finally');
    displayResults();
});





function displayResults() {
    console.log("r1",typeof r1);
    console.log("r2",typeof r2);
    console.log("r3",typeof r3);
}


