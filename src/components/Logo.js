import React from "react";
import styled from "styled-components";

import img from "./nsxcnyc.png";

const StyledImage = styled.img`
  width: 400px;
  margin-bottom: 120px;
`;

export default () => <StyledImage src={img} />;
