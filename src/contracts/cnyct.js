import ReduxSagaWeb3EthContract from "redux-saga-web3-eth-contract";
import abi from "./abi.json";

ReduxSagaWeb3EthContract.setProvider(window.web3.currentProvider);

const instance = new ReduxSagaWeb3EthContract("CNYCT", abi, {
  at: "0x547b66be3d97afb1aedf77d03a6a19f3c97e6107"
});

const { contract, types, actions, reducer, selectors, saga } = instance;
export { contract, types, actions, reducer, selectors, saga };
