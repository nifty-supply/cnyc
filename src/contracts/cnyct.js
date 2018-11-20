import ReduxSagaWeb3EthContract from "redux-saga-web3-eth-contract";
import Web3 from "web3";

import { takeEvery, put, call } from "redux-saga/effects";
import { Map, OrderedMap, fromJS } from "immutable";

import abi from "./abi.json";
import { generateDiscountCode } from "../utils/discountCode";

export const contractAddress = "0x50aebe452bb7b3930b2c3f36696f3c1720024172";

ReduxSagaWeb3EthContract.setProvider(
  window.web3
    ? window.web3.currentProvider
    : new Web3.providers.HttpProvider(
        `https://mainnet.infura.io/${process.env.REACT_APP_INFURA_KEY}`
      )
);

export const instance = new ReduxSagaWeb3EthContract("CNYCT", abi, {
  at: contractAddress
});

const initialState = Map({
  isInitialized: false,
  isLoading: false,
  discountCode: null,
  contracts: OrderedMap()
});

instance.attachMethod(
  "generateDiscountCode",
  types =>
    function*() {
      yield takeEvery(types.call.CALL, function*({
        payload: {
          args: [account, eventName]
        }
      }) {
        const discountCode = yield call(
          generateDiscountCode,
          account,
          eventName
        );
        yield put({
          type: types.call.SUCCESS,
          meta: {
            args: [account, eventName],
            options: { at: contractAddress }
          },
          payload: discountCode
        });
      });
    },
  types => (state = initialState, action) => {
    switch (action.type) {
      case types.call.CALL: {
        return fromJS({ isInitialized: true, isLoading: true });
      }
      case types.call.SUCCESS: {
        return fromJS({ discountCode: action.payload });
      }
      default:
        return state;
    }
  }
);

const { contract, types, actions, reducer, selectors, saga } = instance;
export { contract, types, actions, reducer, selectors, saga };
