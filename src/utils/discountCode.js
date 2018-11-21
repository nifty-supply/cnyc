import { sha3 } from "web3-utils";

export function generateDiscountCode(account, eventName) {
  return sha3(
    account.toLowerCase(),
    process.env.REACT_APP_DISCOUNT_SALT
  ).substr(2, 10);
}
