import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class SignupForm extends React.Component {
  state = {
    data: {
      EmailAddress: "",
      Firstname: "",
      Lastname: "",
      Gender: "",
      Birthdate: "",
      Password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.EmailAddress)) errors.email = "Please Enter Valid Email";
    if (!data.Password) errors.password = "Please Enter Password";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.server && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.server}</p>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="EmailAddress"
            placeholder="email@email.com"
            value={data.EmailAddress}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Form.Field error={!!errors.firtname}>
          <label htmlFor="firstname">Firstname</label>
          <input
            type="firstname"
            id="firstname"
            name="Firstname"
            placeholder="John"
            value={data.Firstname}
            onChange={this.onChange}
          />
          {errors.firstname && <InlineError text={errors.firstname} />}
        </Form.Field>

        <Form.Field error={!!errors.lastname}>
          <label htmlFor="lastname">Lastname</label>
          <input
            type="lastname"
            id="lastname"
            name="Lastname"
            placeholder="Cena"
            value={data.Lastname}
            onChange={this.onChange}
          />
          {errors.lastname && <InlineError text={errors.lastname} />}
        </Form.Field>

        <Form.Field error={!!errors.gender}>
          <label htmlFor="gender">Lastname</label>
          <input
            type="gender"
            id="gender"
            name="Gender"
            placeholder="m"
            value={data.Gender}
            onChange={this.onChange}
          />
          {errors.gender && <InlineError text={errors.gender} />}
        </Form.Field>

        <Form.Field error={!!errors.birthdate}>
          <label htmlFor="birthdate">Birthdate</label>
          <input
            type="birthdate"
            id="birthdate"
            name="Birthdate"
            placeholder="1987-10-28"
            value={data.Birthdate}
            onChange={this.onChange}
          />
          {errors.birthdate && <InlineError text={errors.birthdate} />}
        </Form.Field>

        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="Password"
            value={data.Password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Button primary>Sign Up</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;