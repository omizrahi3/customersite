import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment, Image, Message } from "semantic-ui-react";

class UpdateProfileForm extends React.Component {
  state = {
    data: {
      Firstname: '',
      Lastname: '',
      Gender: '',
      Birthdate: ''
    },
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        Firstname: props.profile.Firstname,
        Lastname: props.profile.Lastname,
        Gender: props.profile.Gender,
        Birthdate: props.profile.Birthdate,
      }
    });
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    this.props
      .submit(this.state.data)
  };

  render() {
    const { data, errors } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit}>
          {errors.server && (
            <Message negative>
              <Message.Header>Something went wrong</Message.Header>
              <p>{errors.server}</p>
            </Message>
          )}
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="title">Firstname</label>
                  <input
                    type="text"
                    id="Firstname"
                    name="Firstname"
                    placeholder="Name"
                    value={data.Firstname}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label htmlFor="maskedNumber">Lastname</label>
                  <input
                    type="text"
                    id="Lastname"
                    name="Lastname"
                    placeholder="Lastname"
                    value={data.Lastname}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label htmlFor="Gender">Gender</label>
                  <input
                    type="text"
                    id="Gender"
                    name="Gender"
                    placeholder="Gender"
                    value={data.Gender}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label htmlFor="Birthdate">Birthdate</label>
                  <input
                    type="text"
                    id="Birthdate"
                    name="Birthdate"
                    placeholder="Birthdate"
                    value={data.Birthdate}
                    onChange={this.onChange}
                  />
                </Form.Field>

              </Grid.Column>

            </Grid.Row>

            <Grid.Row>
              <Button primary>Update</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

UpdateProfileForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default UpdateProfileForm;