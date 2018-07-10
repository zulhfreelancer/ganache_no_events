pragma solidity ^0.4.24;

contract Bar {
    event LogAlphabet(string alphabet);

    function doSomething() public {
        emit LogAlphabet("Hello world!");
    }
}
