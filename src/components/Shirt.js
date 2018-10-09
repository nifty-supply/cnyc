import React from "react";
import styled from "styled-components";

import img from "./cnyc.png";

const StyledImage = styled.img`
  width: 400px;
  margin: 10px;
  height: 100%;
`;

export default () => <StyledImage src={img} />;
