var foo = artifacts.require("./Foo");
var bar = artifacts.require("./Bar");

contract('FooBar', function(accounts) {

  var f, b;
  before(async function() {
    f = await foo.new();
    b = await bar.new();
  });

  function stringify(logs) {
    return JSON.stringify(logs, null, 2);
  }



  it("Foo#doSomething", async function(){
    var t = await f.doSomething();
    var s = `--------------------------------------------------------------------------\n`;
    s    += `TxHash: ${t.tx}\n`;
    s    += `--------------------------------------------------------------------------\n`;
    s    += stringify(t.logs);
    console.log(s);

    /*
      --------------------------------------------------------------------------
      TxHash: 0x4d5343af168451e45eac93d55fd239c2fa002fdc3a172e400c45914469a8a017
      --------------------------------------------------------------------------
      [
        {
          "logIndex": 0,
          "transactionIndex": 0,
          "transactionHash": "0x4d5343af168451e45eac93d55fd239c2fa002fdc3a172e400c45914469a8a017",
          "blockHash": "0x556b0bd6c200afaeca754294e839dd56dd5b9a589d37a10f51d6de3f357d3de9",
          "blockNumber": 73,
          "address": "0x2e335f247e91caa168c64b63104c4475b2af3942",
          "type": "mined",
          "event": "LogNumber",
          "args": {
            "number": "100"
          }
        }
      ]
    */
  });



  it("Bar#doSomething", async function(){
    var t = await b.doSomething();
    var s = `--------------------------------------------------------------------------\n`;
    s    += `TxHash: ${t.tx}\n`;
    s    += `--------------------------------------------------------------------------\n`;
    s    += stringify(t.logs);
    console.log(s);

    /*
      --------------------------------------------------------------------------
      TxHash: 0xd5e0d5ff003d48baac28f0f49781bef7e2486d8890da6c005e3bd88b6c87af34
      --------------------------------------------------------------------------
      [
        {
          "logIndex": 0,
          "transactionIndex": 0,
          "transactionHash": "0xd5e0d5ff003d48baac28f0f49781bef7e2486d8890da6c005e3bd88b6c87af34",
          "blockHash": "0xb51a49b1a83815ef4be0fd0a65c8c3c4dd2e4115b31d8f19c417145f0a2e5eb9",
          "blockNumber": 79,
          "address": "0x057d2360abbe75f9fdf142f2cfe68cfc9a74ec12",
          "type": "mined",
          "event": "LogAlphabet",
          "args": {
            "alphabet": "Hello world!"
          }
        }
      ]
    */
  });



  it("Foo#doSomethingExtra", async function(){
    var t = await f.doSomethingExtra(b.address);
    var s = `--------------------------------------------------------------------------\n`;
    s    += `TxHash: ${t.tx}\n`;
    s    += `--------------------------------------------------------------------------\n`;
    s    += stringify(t.logs);
    console.log(s);

    /*
      --------------------------------------------------------------------------
      TxHash: 0x94a937a3566941952b5e60c21f5d25a48f125b9b5e589ac567a34792088befc0
      --------------------------------------------------------------------------
      [
        {
          "logIndex": 0,
          "transactionIndex": 0,
          "transactionHash": "0x94a937a3566941952b5e60c21f5d25a48f125b9b5e589ac567a34792088befc0",
          "blockHash": "0x85f502ef587ec0b8f09686c6921007d13c3cae6716f8ccfb3ea67aec73459646",
          "blockNumber": 86,
          "address": "0x66078a97def9d40b2ca7abb44733dd897ec6231d",
          "type": "mined",
          "event": "LogNumber",
          "args": {
            "number": "100"
          }
        }
      ]
    */
  });


  /**
  *  ---------------
  *  Topics lookup:
  *  ---------------
  *    LogNumber(uint256)  - 0x2012ef02e82e91abf55727cc31c3b6e3375003aa9e879f855db72d9e78822c40
  *    LogAlphabet(string) - 0x2af88db35e872d9c8e4da3268e9b3349ba4f3e981fe6722647f2e212d384096c
  */


  /*
    -------------------------
    eth_getTransactionReceipt
    -------------------------
    $ curl -X POST http://127.0.0.1:7545 -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0", "method":"eth_getTransactionReceipt", "params":["0x94a937a3566941952b5e60c21f5d25a48f125b9b5e589ac567a34792088befc0"], "id":1 }'

    -------------------------
    Response
    -------------------------
    {
      "id":1,
      "jsonrpc":"2.0",
      "result":{
        "transactionHash":"0x94a937a3566941952b5e60c21f5d25a48f125b9b5e589ac567a34792088befc0",
        "transactionIndex":"0x0",
        "blockHash":"0x85f502ef587ec0b8f09686c6921007d13c3cae6716f8ccfb3ea67aec73459646",
        "blockNumber":"0x56",
        "gasUsed":"0x6a89",
        "cumulativeGasUsed":"0x6a89",
        "contractAddress":null,
        "logs":[
          {
            "logIndex":"0x0",
            "transactionIndex":"0x0",
            "transactionHash":"0x94a937a3566941952b5e60c21f5d25a48f125b9b5e589ac567a34792088befc0",
            "blockHash":"0x85f502ef587ec0b8f09686c6921007d13c3cae6716f8ccfb3ea67aec73459646",
            "blockNumber":"0x56",
            "address":"0x66078a97def9d40b2ca7abb44733dd897ec6231d",
            "data":"0x0000000000000000000000000000000000000000000000000000000000000064", <-- that's 100
            "topics":[
              "0x2012ef02e82e91abf55727cc31c3b6e3375003aa9e879f855db72d9e78822c40" <-- LogNumber
            ],
            "type":"mined"
          },
          {
            "logIndex":"0x1",
            "transactionIndex":"0x0",
            "transactionHash":"0x94a937a3566941952b5e60c21f5d25a48f125b9b5e589ac567a34792088befc0",
            "blockHash":"0x85f502ef587ec0b8f09686c6921007d13c3cae6716f8ccfb3ea67aec73459646",
            "blockNumber":"0x56",
            "address":"0x35b338b4ade005f25a8982a597638827b8617ad4",
            "data":"0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c48656c6c6f20776f726c64210000000000000000000000000000000000000000", <-- 48656c6c6f20776f726c6421 is 'Hello world!'
            "topics":[
              "0x2af88db35e872d9c8e4da3268e9b3349ba4f3e981fe6722647f2e212d384096c" <-- LogAlphabet
            ],
            "type":"mined"
          }
        ],
        "status":"0x1",
        "logsBloom":"0x00000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000004000000000000000000000000000000000000020000000000000000000000000008000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000100010000000000000000000000000000000000000000000000000000000000200000000000000000000000000000010000000"
      }
    }
  */

});
