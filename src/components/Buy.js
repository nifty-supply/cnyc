import React from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { Button, Select, Input, Label, FormGroup } from "smooth-ui";

const adapt = Component => ({ input, meta: { valid }, ...rest }) => (
  <Component {...input} {...rest} valid={valid} />
);

const AdaptedInput = adapt(Input);
const AdaptedSelect = adapt(Select);
const required = value => (value ? undefined : "Required");

const StyledForm = styled.form`
  font-size: 16px;
  width: 400px;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
`;

const Warning = styled.div`
  color: tomato;
  margin-top: 25px;
`;

const StyledSelect = styled(AdaptedSelect)`
  margin-right: 10px;

  &.sui-control {
    width: 200px;
    display: inline-block;
  }
`;

const StyledBuy = styled.div``;
const StyledButton = styled(Button)`
  &.sui-button-primary:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
`;

const StyledInput = styled(AdaptedInput)`
  &.sui-control {
    width: 300px;
  }
`;

function isDisabled(status) {
  return status === "ACCOUNT_LOCKED";
}

function renderWarning(status) {
  switch (status) {
    case "ACCOUNT_LOCKED":
      if (window.web3)
        return <Warning>Please unlock Metamask to purchase.</Warning>;
      return (
        <Warning>
          Please install <a href="https://metamask.io/">Metamask</a> to
          purchase.
        </Warning>
      );
    default:
      return null;
  }
}

export default ({ purchase, price, status }) => {
  console.log(status);
  return (
    <Form
      onSubmit={({ name, size }) => purchase(name, size, price.get("value"))}
      render={({ handleSubmit, pristine, invalid, form }) => (
        <StyledForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Field
              name="name"
              id="name"
              validate={required}
              component={StyledInput}
              control
              placeholder="Your Name"
            />
          </FormGroup>
          <StyledBuy>
            <Field
              name="size"
              id="size"
              component={StyledSelect}
              control
              options={[
                { label: "Small", value: "0" },
                { label: "Medium", value: "1" },
                { label: "Large", value: "2" },
                { label: "X-Large", value: "3" }
              ]}
            />
            <StyledButton disabled={isDisabled(status)}>Purchase</StyledButton>
          </StyledBuy>
          {renderWarning(status)}
        </StyledForm>
      )}
    />
  );
};
