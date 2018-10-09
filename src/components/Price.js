import React from "react";
import styled from "styled-components";
import Web3Utils from "web3-utils";

const StyledPriceContainer = styled.div`
  font-size: 16px;
  width: 400px;
  margin: 30px 0;
  font-size: 1.2em;
`;

export default ({ price }) => {
  return (
    <StyledPriceContainer>
      {price && price.get("value") && Web3Utils.fromWei(price.get("value"))} eth
      ($20)
    </StyledPriceContainer>
  );
};
