import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import Web3Utils from "web3-utils";
import JSEncrypt from "jsencrypt";

import { actions, selectors, instance } from "../contracts/cnyct";

import Purchase from "../components/Purchase";
import ipfs from "../utils/ipfs";

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCx3S/nFd1+KaunH/bT08hKBJGG
b10//5fbkuaM6yDD5nYuzZ4s0zhCT/9xLfnWSFJPd9NXD0FEUcoy+nx9XxKrivr6
cQuIxefki7ePuhlWyGCuFKpGzgVhogHR3047oPKUlcmS7OP8XSu+C104aVYIUZeN
RjWo6UdT9haqd99ZkQIDAQAB
-----END PUBLIC KEY-----`;

const encrypt = new JSEncrypt();
encrypt.setPublicKey(PUBLIC_KEY);

const mapStateToProps = (state, props) => {
  const price = selectors.methods.calculatePrice()(state);
  return { price };
};

const mapDispatchToProps = (dispatch, props) => ({
  purchase: async (name, size, price) => {
    const encrypted = encrypt.encrypt(JSON.stringify({ size, name, price }));
    const hash = await ipfs.add(encrypted);
    dispatch(
      actions.methods
        .purchase({ value: price })
        .send(Web3Utils.asciiToHex(hash))
    );
  },
  calculatePrice: () => dispatch(actions.methods.calculatePrice().call()),
  resolveEnsAddress: () => dispatch(actions.methods.resolveEnsAddress().call())
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.price) this.props.calculatePrice();
      console.log("instance: ", instance);
      if (this.props.price) this.props.resolveEnsAddress();
    }
  })
)(Purchase);
