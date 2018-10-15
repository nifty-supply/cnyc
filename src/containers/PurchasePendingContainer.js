import { connect } from "react-redux";
import { compose } from "recompose";

import { selectors } from "../contracts/cnyct";
import PurchasePending from "../components/PurchasePending";

const mapStateToProps = state => ({
  purchase: selectors.methods.purchase()(state)
});

export default compose(connect(mapStateToProps))(PurchasePending);
