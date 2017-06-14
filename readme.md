# Promise Examples

Node.js examples of promise chains using bluebird promises.
Demonstrate some use patterns.
Demonstration of clean premature exit from promise chain.

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
demo of premature promise chain exit using throw
```
node ex-exit-chain.js
```
Cleaner exit approach - exit promise chain with filter catch handler using inheritance.
Thus, the catch-all is not executed.
```
node ex-exit-chain_1.js
```


