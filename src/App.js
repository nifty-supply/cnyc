import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { actions, selectors } from "redux-saga-web3";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Redirect, Route, Switch } from "react-router-dom";

import NetworkStatus from "react-redux-saga-web3/lib/components/NetworkStatus";

import Orders from "./Orders";
import Offers from "./containers/OffersContainer";

import PurchaseContainer from "./containers/PurchaseContainer";
import { Logo, Shirt } from "./components";
import withLoading from "./utils/withLoading";

const StyledApp = styled.div`
  font-family: "Courier New", Courier, serif;
`;

const StyledHome = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledProduct = styled.div`
  display: flex;
  @media only screen and (max-width: 830px) {
    flex-direction: column;
  }
`;

const StyledNetworkStatus = styled(NetworkStatus)`
  position: absolute;
  top: 10px;
  right: 20px;
`;

const Home = () => (
  <StyledHome>
    <Logo />
    <StyledProduct>
      <Shirt />
      <PurchaseContainer />
    </StyledProduct>
  </StyledHome>
);

class App extends Component {
  render() {
    const { network, accounts } = this.props;
    return (
      <StyledApp>
        <StyledNetworkStatus networkId={network} address={accounts[0]} />
        {network !== 1 ? (
          <div>Please switch to Ethereum Mainnet</div>
        ) : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/orders" component={Orders} />
            <Route path="/offers" component={Offers} />
          </Switch>
        )}
      </StyledApp>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(actions.init.init()),
  getAccounts: () => dispatch(actions.accounts.getRequest())
});

export default compose(
  connect(
    state => ({
      isInitialized: selectors.init.selectIsInitialized(state),
      network: selectors.network.selectId(state),
      accounts: selectors.accounts.selectAccounts(state)
    }),
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.init();
      this.props.getAccounts();
    }
  }),
  withLoading(
    ({ accounts, isInitialized, network }) =>
      !accounts || !isInitialized || !network
  )
)(App);
