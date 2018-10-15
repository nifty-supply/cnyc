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
`;

const CardPendingText = styled.div`
  text-align: center;
  color: #fff;
  margin: 25px;
  margin-bottom: 0;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 22px;
`;

const CardPending = ({ children }) => (
  <CardPendingContainer>
    <CardPendingText>{children}</CardPendingText>
  </CardPendingContainer>
);

function getPhaseText(phase) {
  switch (phase) {
    case "UPLOADING":
      return "We're uploading your collection 🤘";
    case "SENDING":
      return "Please confirm the transaction using metamask 😎";
    case "MINING":
      return "Waiting for your transaction to be mined 🎉";
    default:
      return "Loading";
  }
}

const PurchasePending = ({ isLoading, phase }) =>
  isLoading ? <CardPending>{getPhaseText(phase)}</CardPending> : <div />;

export default PurchasePending;
