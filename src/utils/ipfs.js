import IPFS from "ipfs-mini";

const ipfsWrite = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

const ipfsRead = new IPFS({
  host: "gateway.ipfs.io",
  port: 443,
  protocol: "https"
});

export default {
  add: content =>
    new Promise((resolve, reject) =>
      ipfsWrite.add(content, (err, res) => (err ? reject(err) : resolve(res)))
    ),
  cat: address =>
    new Promise((resolve, reject) =>
      ipfsRead.cat(address, (err, res) => (err ? reject(err) : resolve(res)))
    )
};
