import React from "react";
import styled from "styled-components";

import img from "./nsxcnyc.png";

const StyledImage = styled.img`
  width: 400px;
  margin-bottom: 120px;
  @media only screen and (max-width: 830px) {
    margin-top: 40px;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 600px) {
    width: 95%;
    margin-top: 40px;
    margin-bottom: 20px;
  }
`;

export default () => <StyledImage src={img} />;
