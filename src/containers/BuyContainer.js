import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import Web3Utils from "web3-utils";
import { actions, selectors } from "redux-saga-web3";

import Buy from "../components/Buy";

const mapStateToProps = (state) => {
  const status = selectors.init.selectStatus()(state);
  return { status };
};

export default compose(
  connect(
    mapStateToProps
  ),
)(Buy);
