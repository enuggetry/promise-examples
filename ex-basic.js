/*
 * demonstrates a basic promise chain.
 * 
 * Demonstrate error condition by:
 * 1) disable network
 * 2) delete one of the files from the local directory.
 */

var promise = require('bluebird');
var fs = promise.promisifyAll(require("fs"));
var request = promise.promisifyAll(require("request"));

var r1, r2, r3;
fs.readFileAsync("myfile.json", "utf8").then(function(data) {
    r1 = data;

    // just unplug your network to make this fail.

    var url = 'https://rawgit.com/enuggetry/promise-examples/master/myfile.json';
    return request.getAsync({url:url,json:true});
}).then(function(data2) {
    r2 = data2.body;

    console.log("statusCode",data2.statusCode,"statusMessage",data2.statusMessage);

    // delete this file to make this fail

    return fs.readFileAsync("myfile_1.json", "utf8");
}).then(function(data3) {
    r3 = JSON.parse(data3);

    // can access r1 or r2 or r3
    console.log(">>> r1",r1);
    console.log(">>> r2",r2);
    console.log(">>> r3",r3);

    console.log("r1",typeof r1);
    console.log("r2",typeof r2);
    console.log("r3",typeof r3);

     
}).catch(function(err){                 // catch all errors
    //error handling logic
    console.log('error',err);
    
    console.log("r1",typeof r1);
    console.log("r2",typeof r2);
    console.log("r3",typeof r3);
});

