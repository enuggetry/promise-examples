var promise = require('bluebird');
var fs = promise.promisifyAll(require("fs"));
var request = promise.promisifyAll(require("request"));

fs.readFileAsync("myfile.json", "utf8").then(function(data) {

});


var r1, r2, r3;
fs.readFileAsync("myfile.json", "utf8").then(function(data) {
     r1 = data;
     
     var url = 'https://rawgit.com/enuggetry/promise-examples/master/myfile.json';
     return request(url);
}).then(function(data2) {
     r2 = result2;
     
     
     return fs.readFileAsync("myfile_1.json", "utf8");
}).then(function(data3) {
     r3 = data3;
     
     // can access r1 or r2 or r3
     console.log(">>> r1",r1);
     console.log(">>> r2",r2);
     console.log(">>> r3",r3);
     
     
}).catch(function(err){
    //error handling logic
    console.log('error',err);
});