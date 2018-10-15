pragma solidity ^0.4.18;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "./Medianizer.sol";

contract CNYCTee is ERC721Token, Pausable {
  using SafeMath for uint256;

  event Purchase(address indexed purchaser, string metadata);
  string public metadataUri;
  uint256 public price = 20000000000000000000 * 10 ** 18;
  address public CNYC = 0x88c255e16e86359099cfad8233e0c9721538b757;

  Medianizer public medianizer = Medianizer(0xE39451e34f8FB108a8F6d4cA6C68dd38f37d26E3);
  /* Medianizer public medianizer = Medianizer(0x729D19f657BD0614b4985Cf1D82531c67569197B); */

  constructor(string _name, string _symbol, string _metadataUri) ERC721Token(_name, _symbol) public {
    metadataUri = _metadataUri;
  }

  function calculatePrice() public returns (uint256) {
    var (ethPrice, ok) = medianizer.peek();

    return price.div(uint256(ethPrice));
  }

  function purchase(string metadata) public whenNotPaused payable {
    require(msg.value >= calculatePrice(), "Not enough ETH sent");

    uint256 tokenId = allTokens.length;
    _mint(msg.sender, tokenId);
    _setTokenURI(tokenId, metadataUri);

    // Forward ETH to CNYC wallet
    CNYC.transfer(msg.value);

    emit Purchase(msg.sender, metadata);
  }
}
