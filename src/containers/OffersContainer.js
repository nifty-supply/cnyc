import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";

import { selectors as web3Selectors } from "redux-saga-web3";
import { actions, selectors, contractAddress } from "../contracts/cnyct";

import Offers from "../components/Offers";

// TODO - REMOVE HARDCODED EVENT NAME
const mapStateToProps = (state, props) => ({
  status: web3Selectors.init.selectStatus(state),
  accounts: web3Selectors.accounts.selectAccounts(state),
  tokenBalance: selectors.methods.balanceOf({ at: contractAddress })(state),
  discountCode: selectors.methods.generateDiscountCode({ at: contractAddress })(
    state
  )
});

const mapDispatchToProps = (dispatch, { accounts }) => ({
  getTokenBalance: account =>
    dispatch(actions.methods.balanceOf({ at: contractAddress }).call(account)),
  generateDiscountCode: (account, eventTitle) =>
    dispatch(
      actions.methods
        .generateDiscountCode({ at: contractAddress })
        .call(account, eventTitle)
    )
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      const {
        accounts,
        tokenBalance,
        getTokenBalance,
        discountCode,
        generateDiscountCode,
        eventName = "Blockchains and the Future of Organizations"
      } = this.props;
      if (accounts && !tokenBalance) getTokenBalance(accounts.get(0));
      if (accounts && !discountCode) {
        generateDiscountCode(accounts.get(0), eventName);
      }
    }
  })
)(Offers);
