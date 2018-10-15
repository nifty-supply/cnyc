import React from "react";
import { branch, renderComponent } from "recompose";

const withLoading = (isLoading, props = { color: "#000", width: 20 }) => {
  const Indicator = () => <div>Loading...</div>;
  return branch(isLoading, renderComponent(Indicator));
};

export default withLoading;
