import React, { Fragment } from "react";
import styled from "styled-components";

import { StyledButton, isDisabled, renderWarning } from "./Buy";
import img from "./event.png";

const _StyledButton = styled(StyledButton)`
  height: 2em;
`;

const OffersList = styled.div`
  display: flex;
  margin: 0 40px;
  margin-top: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const OffersPage = styled.div`
  display: flex;
  margin: 0 40px;
  margin-top: 60px;
  flex-wrap: wrap;
  flex-direction: column;
`;

const StyledTitle = styled.div`
  max-width: 70vw;
  margin-left: 40px:
  margin-top: 80px;
  @media only screen and (max-width: 830px) {
    margin-top: 40px;
  }
  @media only screen and (max-width: 600px) {
    width: 95%;
    margin-top: 40px;
  }
`;

const StyledEventsTitle = styled.h2`
  margin-bottom: 0px;
`;

const StyledOffer = styled.div`
  display: flex;
  margin-left: 5px;
  @media only screen and (max-width: 655px) {
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

const StyledBalance = styled.div`
  float: right;
`;

const StyledImage = styled.img`
  display: flex;
  max-height: 180px;
  margin-right: 30px;
  @media only screen and (max-width: 800px) {
    max-height: 140px;
  }
`;

const ListDescription = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 50vw;
`;

const ListDescriptionItem = styled.h3`
  width: 100%;
`;

const getTokenBalance = (_tokenBalance, accounts) =>
  _tokenBalance && _tokenBalance.hasIn([accounts.get(0), "value"])
    ? _tokenBalance.getIn([accounts.get(0), "value"])
    : null;

const hasToken = (_tokenBalance, accounts) =>
  getTokenBalance(_tokenBalance, accounts) > 0;

const getDiscountCode = _discount =>
  _discount && _discount.has("discountCode")
    ? _discount.get("discountCode")
    : null;

const activeOffers = {
  events: [
    {
      name: "Blockchains and the Future of Organizations",
      eventUrl:
        "https://www.eventbrite.com/e/blockchains-the-future-of-organizations-tickets-52104570172"
    }
  ]
};

export default ({ status, accounts, tokenBalance, discountCode }) => {
  return (
    <OffersPage>
      <StyledTitle>
        <h1>Active offers for CNYC Supporters</h1>
      </StyledTitle>
      <br />
      <StyledBalance>
        {" "}
        Token balance:{" "}
        {accounts
          ? getTokenBalance(tokenBalance, accounts)
          : "Unlock metamask"}{" "}
      </StyledBalance>
      <br />
      <div>
        <StyledEventsTitle>Events:</StyledEventsTitle>
        <OffersList>
          {activeOffers.events &&
            activeOffers.events.map(evt => (
              <StyledOffer key={evt.name}>
                <StyledImage src={img} />
                <ListDescription>
                  <ListDescriptionItem>{evt.name}</ListDescriptionItem>
                  <a
                    href={`${evt.eventUrl}?discount=${discountCode &&
                      getDiscountCode(discountCode)}`}
                    target="_blank"
                  >
                    <_StyledButton
                      disabled={
                        isDisabled(status) || !hasToken(tokenBalance, accounts)
                      }
                    >
                      Redeem Discount
                    </_StyledButton>
                  </a>
                </ListDescription>
              </StyledOffer>
            ))}
        </OffersList>
      </div>
      {renderWarning(status, "redeem")}
    </OffersPage>
  );
};
