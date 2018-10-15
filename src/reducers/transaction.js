import { Map, fromJS } from "immutable";
import { types } from "../contracts/cnyct";

const keys = {
  PHASE: "phase",
  RECEIPT: "receipt",
  ERROR: "error"
};

const phases = {
  SENDING: "SENDING",
  MINING: "MINING",
  RECEIPT: "RECEIPT",
  ERROR: "ERROR"
};

const initialState = Map({ phase: null, receipt: null, error: null });

export default (state = initialState, action) => {
  switch (action.type) {
    case types.methods.purchase.send.SEND: {
      return state.set([keys.PHASE], phases.SENDING);
    }

    case types.methods.purchase.send.TRANSACTION_HASH: {
      return state.set([keys.PHASE], phases.MINING);
    }

    case types.methods.purchase.send.RECEIPT: {
      const {
        payload: {
          events: {
            Purchase: {
              returnValues: { metadata }
            }
          }
        }
      } = action;
      return state.merge({
        [keys.PHASE]: phases.RECEIPT,
        [keys.RECEIPT]: Map({ metadata: fromJS(metadata) })
      });
    }

    case types.methods.purchase.send.ERROR: {
      return state.merge(
        Map({
          [keys.PHASE]: phases.ERROR,
          [keys.ERROR]: fromJS(action.payload)
        })
      );
    }
    default:
      return state;
  }
};
