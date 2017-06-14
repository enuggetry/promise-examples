/*
 * demonstrates promise chain - premature exit using throw
 * 
 * In this example we ue throw to process to exit the promise chain.
 * however, the side effect is thaat the normal catch is also called.
 * 
 */

var promise = require('bluebird');
var fs = promise.promisifyAll(require("fs"));
var request = promise.promisifyAll(require("request"));

var r1, r2, r3;

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
    throw new myExitHandler();

    // delete this file to make this fail
    console.log('step 3');

    return fs.readFileAsync("myfile_1.json", "utf8");
}).then(function(data3) {
    r3 = JSON.parse(data3);

    // can access r1 or r2 or r3
    console.log("complete")
    displayResults(r1,r2,r3);
     
}).catch(function(err){                 // catch all errors
    //error handling logic
    console.log('error',err);
    displayResults(r1,r2,r3);
});

function myExitHandler(r1,r2,r3) {
    console.log("MyExitHandler");
    
}

function displayResults(r1,r2,r3) {
    console.log("r1",typeof r1);
    console.log("r2",typeof r2);
    console.log("r3",typeof r3);
}