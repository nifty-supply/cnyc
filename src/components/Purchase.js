import React from "react";
import styled from "styled-components";

import Price from "./Price";
import BuyContainer from "../containers/BuyContainer";

const Title = styled.div`
  font-size: 1.36364em;
  font-weight: normal;
  margin-bottom: 20px;
`;

const Content = styled.div`
  width: 360px;
  margin-left: 50px;
`;

export default ({ purchase, price }) => (
  <Content>
    <Title>CNYC Tee + OG Token Bundle</Title>
    <div>
      Support CryptoNYC in styled with the purchase of our limited edition tee
      and OG Supporter Token. OG Supporter tokens will grant owners access to
      exclusive events and resources in the future!
      <br />
      <br />
      Contains: Premium Quality Alternative tee and locally-sourced ERC721
      token.
      <br />
      <br />
      Shirts will be available for pickup at our co-working space and events.
      We'll announce availability through the{" "}
      <a href="http://www.cryptonyc.org/">newsletter</a>.
    </div>
    <Price price={price} />
    <BuyContainer purchase={purchase} price={price} />
  </Content>
);
