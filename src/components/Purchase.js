import React from "react";
import styled from "styled-components";

import Price from "./Price";
import Buy from "./Buy";

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
      and OG Supporter Token.
      <br />
      <br />
      Contains: Premium Quality Alternative tee and locally-sourced ERC721
      token.
    </div>
    <Price price={price} />
    <Buy purchase={purchase} price={price} />
  </Content>
);
