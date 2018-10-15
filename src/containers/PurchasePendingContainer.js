import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";

import { selectors } from "../contracts/cnyct";
import PurchasePending from "../components/PurchasePending";

const mapStateToProps = (state, props) => ({
  // isLoading,
  // phase
});

const mapDispatchToProps = (dispatch, props) => ({});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {}
  })
)(PurchasePending);
