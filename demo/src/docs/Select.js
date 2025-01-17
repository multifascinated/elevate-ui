import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Select from "elevate-ui/Select";
import Button from "elevate-ui/Button";

const roygbiv = [
  { label: "Red", value: "red" },
  { label: "Orange", value: "orange" },
  { label: "Yellow", value: "yellow" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
  { label: "Indigo", value: "indigo" },
  { label: "Violet", value: "violet" },
];

const cmyk = [
  { label: "Cyan", value: "cyan" },
  { label: "Magenta", value: "magenta" },
  { label: "Yellow", value: "yellow" },
  { label: "Black", value: "black" },
];

const states = [
  { label: "Arizona", value: "Arizona", note: "AZ" },
  { label: "California", value: "California", note: "CA" },
  { label: "Ohio", value: "Ohio", note: "OH" },
  { label: "Maine", value: "Maine", note: "ME" },
  { label: "Michigan", value: "Michigan", note: "MI" },
  { label: "Washington", value: "Washington", note: "WA" },
  { label: "Oregon", value: "Oregon", note: "OR" },
  { label: "New York", value: "New York", note: "NY" },
  { label: "Florida", value: "Florida", note: "FL" },
  { label: "Montana", value: "Montana", note: "MT" },
];

class Selects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  onSearch = ({ inputValue, originalItems, setItems }) => {
    this.setState({ loading: true });
    if (inputValue === "") {
      this.setState({ loading: false });
      return setItems(originalItems);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        this.setState({ loading: false });
        resolve(setItems(states));
      }, 1500);
    });
  };

  render() {
    return (
      <div style={{ margin: "16px 0px" }}>
        <Formik
          initialValues={{
            color: "",
            color2: "",
            states: [],
          }}
          validationSchema={() =>
            Yup.object().shape({
              color: Yup.string().required("A favorite color is required"),
              color2: Yup.string().required("A secondary color is required"),
              states: Yup.string().required("A state is required"),
            })
          }
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 1000);
          }}
          render={({ isSubmitting, isValid }) => (
            <Form noValidate style={{ maxWidth: "420px" }}>
              <Field
                id="color"
                name="color"
                label="Favorite Color"
                items={roygbiv}
                component={Select}
              />
              <div style={{ maxWidth: "180px", margin: "48px 0px" }}>
                <Field
                  id="color2"
                  name="color2"
                  label="Secondary Color"
                  items={cmyk}
                  component={Select}
                />
              </div>
              <Field
                id="states"
                name="states"
                label="States (with search functionality and notes)"
                items={states}
                component={Select}
                onSearch={this.onSearch}
                loading={this.state.loading}
              />
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default Selects;
