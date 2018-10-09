import ReduxSagaWeb3EthContract from "redux-saga-web3-eth-contract";
import abi from "./abi.json";

ReduxSagaWeb3EthContract.setProvider(window.web3.currentProvider);

const instance = new ReduxSagaWeb3EthContract("CNYCT", abi, {
  at: "0xa80cf6422f2baf64b0ffb449e9a2a7ef3f59496c"
});

const { contract, types, actions, reducer, selectors, saga } = instance;
export { contract, types, actions, reducer, selectors, saga };
