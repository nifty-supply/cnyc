import React, { Component } from "react";
import abi from "./contracts/abi.json";
import JSEncrypt from "jsencrypt";

const Web3 = require("web3");
const Web3EthContract = require("web3-eth-contract");
const Web3Utils = require("web3-utils");
const IPFS = require("ipfs-mini");

Web3EthContract.setProvider(
  window.web3
    ? window.web3.currentProvider
    : new Web3.providers.HttpProvider(
        `https://mainnet.infura.io/${process.env.REACT_APP_INFURA_KEY}`
      )
);

const contract = new Web3EthContract(
  abi,
  "0x50aebe452bb7b3930b2c3f36696f3c1720024172"
);

const decrypt = new JSEncrypt();

const ipfs = new IPFS({
  host: "gateway.ipfs.io",
  port: 443,
  protocol: "https"
});

const cat = address =>
  new Promise((resolve, reject) =>
    ipfs.cat(address, (err, res) => (err ? reject(err) : resolve(res)))
  );

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: ""
    };
  }

  getSize(size) {
    switch (size) {
      case "0":
        return "Small";
      case "1":
        return "Medium";
      case "2":
        return "Large";
      case "3":
        return "X-Large";
      default:
        return "None";
    }
  }
  render() {
    const { key, loading, orders } = this.state;

    if (loading) {
      return "Loading";
    }
    console.log(orders);

    if (orders) {
      return (
        <ul>
          {orders.map(order => (
            <li>
              {JSON.parse(order).name} / {this.getSize(JSON.parse(order).size)}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div>
        <div>Provide private key:</div>
        <textarea
          value={key}
          onChange={event => this.setState({ key: event.target.value })}
        />
        <button
          onClick={() => {
            decrypt.setPrivateKey(key);
            console.log("fetching");
            contract.getPastEvents(
              "Purchase",
              {
                fromBlock: 6521007,
                toBlock: "latest"
              },
              (error, events) => {
                Promise.all(
                  events.map(event => {
                    const purchaser = event.returnValues.purchaser;
                    const metadata = event.returnValues.metadata;
                    const ipfsCID = Web3Utils.hexToAscii(metadata);

                    return cat(ipfsCID);
                  })
                )
                  .then(items => {
                    console.log(items);
                    return items.map(item => decrypt.decrypt(item));
                  })
                  .then(orders => {
                    console.log(orders);
                    return this.setState({
                      orders,
                      loading: false
                    });
                  });
              }
            );
            this.setState({
              loading: true
            });
          }}
        >
          submit
        </button>
      </div>
    );
  }
}

export default Orders;
