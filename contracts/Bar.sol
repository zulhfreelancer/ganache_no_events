pragma solidity ^0.4.24;

contract Bar {
    event LogAlphabet(string word);

    function doSomething() public {
        emit LogAlphabet("Hello!");
    }
}
