pragma solidity ^0.4.24;

contract Bar {
    event LogAlphabet(uint256 number1, uint256 number2);

    function doSomething() public {
        emit LogAlphabet(200, 300);
    }
}
