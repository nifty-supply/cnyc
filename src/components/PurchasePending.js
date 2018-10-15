import React from "react";
import styled from "styled-components";

const CardPendingContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 5000000;
`;

const CardPendingText = styled.div`
  text-align: center;
  color: #fff;
  margin: 25px;
  margin-bottom: 0;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 22px;
  text-decoration: none;
`;

const CardPending = ({ children }) => (
  <CardPendingContainer>
    <CardPendingText>{children}</CardPendingText>
  </CardPendingContainer>
);

function getPhaseText(phase) {
  switch (phase) {
    case "SENT":
      return "Please confirm the transaction using metamask 😎";
    case "PENDING":
      return `Waiting for your transaction to be mined 🎉`;
    default:
      return "Loading";
  }
}

function renderEtherscanLink(transactionHash) {
  return (
    <div>
      <a href={`https://etherscan.io/tx/${transactionHash}`}>
        Transaction status
      </a>
    </div>
  );
}
const PurchasePending = ({ purchase }) => {
  return !!purchase ? (
    <CardPending>
      {getPhaseText(purchase.get("phase"))}
      {purchase.has("transactionHash") &&
        renderEtherscanLink(purchase.get("transactionHash"))}
    </CardPending>
  ) : (
    <div />
  );
};

export default PurchasePending;
