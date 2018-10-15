import ReduxSagaWeb3EthContract from "redux-saga-web3-eth-contract";
import Web3 from "web3";

import abi from "./abi.json";

ReduxSagaWeb3EthContract.setProvider(window.web3 ? window.web3.currentProvider : new Web3.providers.HttpProvider("https://mainnet.infura.io/"));

const instance = new ReduxSagaWeb3EthContract("CNYCT", abi, {
  at: "0x50aebe452bb7b3930b2c3f36696f3c1720024172"
});

const { contract, types, actions, reducer, selectors, saga } = instance;
export { contract, types, actions, reducer, selectors, saga };
