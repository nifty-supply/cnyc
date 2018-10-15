import { combineReducers } from "redux-immutable";
import { reducers as web3Reducers } from "redux-saga-web3";

import { reducer as cnyctReducer } from "../contracts/cnyct";
import transaction from "./transaction";

const reducers = combineReducers({
  ...web3Reducers,
  ...cnyctReducer,
  transaction
});

export default reducers;
