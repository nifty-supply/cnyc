import ReduxSagaWeb3EthContract from "redux-saga-web3-eth-contract";
import abi from "./abi.json";
import { takeEvery, call, put } from "redux-saga/effects";

import { resolveEnsAddress } from "../utils/ens";

ReduxSagaWeb3EthContract.setProvider(window.web3.currentProvider);

export const instance = new ReduxSagaWeb3EthContract("CNYCT", abi, {
  at: "0xa80cf6422f2baf64b0ffb449e9a2a7ef3f59496c"
});

instance.attachMethod(
  "resolveEnsAddress",
  types =>
    function*() {
      yield takeEvery(types.call.CALL, function*() {
        const ensAddress = yield call(
          resolveEnsAddress,
          window.web3.currentProvider,
          "ethereum.eth"
        );
        yield put({ type: "testing", payload: ensAddress });
      });
    }
);

const { contract, types, actions, reducer, selectors, saga } = instance;
export { contract, types, actions, reducer, selectors, saga };
