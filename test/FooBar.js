var truffleAssert = require('truffle-assertions');
var truffleEvent  = require('truffle-events');
var foo = artifacts.require("./Foo");
var bar = artifacts.require("./Bar");

contract('FooBar', function(accounts) {

  var f, b;
  before(async function() {
    f = await foo.new();
    b = await bar.new();
  });

  it("Foo#doSomething", async function(){
    var t = await f.doSomething();
    truffleAssert.eventEmitted(t, 'LogNumber', (ev) => {
      return ev.number == 100;
    });
  });

  it("Bar#doSomething", async function(){
    var t = await b.doSomething();
    truffleAssert.eventEmitted(t, 'LogAlphabet', (ev) => {
      return ev.word == "Hello!";
    });
  });

  it("Foo#doSomethingExtra", async function(){
    var fooScope = await f.doSomethingExtra(b.address);
    var barScope = truffleEvent.formTxObject('Bar', 1, fooScope);

    truffleAssert.eventEmitted(fooScope, 'LogNumber', (ev) => {
      return ev.number == 100;
    });

    truffleAssert.eventEmitted(barScope, 'LogAlphabet', (ev) => {
      return ev.word == "Hello!";
    });
  });

});
