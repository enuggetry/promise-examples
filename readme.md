# Promise Examples

Node.js examples of promise chains using [bluebird](http://bluebirdjs.com) promises.
Demonstrate some use patterns and case of clean premature exit from promise chain.

### Install
```
git clone https://github.com/enuggetry/promise-examples.git
cd promise-examples
npm install .
```

### Run
demonstrates basic promise chain
```
node ex-basic.js
```
demo of premature promise chain exit using throw (non ideal)
```
node ex-exit-chain.js
```
Cleaner exit approach - exit promise chain with filter catch handler using inheritance.
Thus, the catch-all is not executed.
```
node ex-exit-chain_1.js
```

*References* [bluebird .catch](http://bluebirdjs.com/docs/api/catch.html)

