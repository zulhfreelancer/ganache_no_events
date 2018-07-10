pragma solidity ^0.4.24;

import "./Bar.sol";

contract Foo {
    event LogNumber(uint256 number);

    function doSomething() public {
        emit LogNumber(100);
    }

    function doSomethingExtra(address bar) public {
        emit LogNumber(100);
        Bar b = Bar(bar);
        b.doSomething();
    }
}
