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

const StyledSelect = styled(AdaptedSelect)`
  margin-right: 10px;

  &.sui-control {
    width: 200px;
    display: inline-block;
  }
`;

const StyledBuy = styled.div``;

const StyledInput = styled(AdaptedInput)`
  &.sui-control {
    width: 300px;
  }
`;

export default ({ purchase, price }) => (
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
          <Button>Purchase</Button>
        </StyledBuy>
      </StyledForm>
    )}
  />
);
