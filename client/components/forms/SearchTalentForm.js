import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Form, Dropdown, List } from "semantic-ui-react";

class SearchTalentForm extends React.Component {
  state = {
    query: "",
    loading: false,
    options: [],
    listItems: ['apple', 'orange', 'pear'],
    talents: {}
  };

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data.searchQuery
    });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  onChange = (e, data) => {
    this.setState({ query: data.value });
    this.props.onTalentSelect(this.state.talents[data.value]);
  }

  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    const instance = axios.create({timeout: 1000});
    instance.defaults.headers.common['token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJpbmciOiJkZWZhdWx0IiwiaWF0IjoxNTI3Mjg5MzE3fQ.FB40tuqn1xUaSxSwCs6GpMAjen5zx1btH__eQuY0S7w";
    instance.post('http://www.qa.getchatwith.com/api/GetAppTalentByCategory', {
      CategoryId: '6BAF3D6162EB4D2B8D9D363C04BB0539'
    })
    .then(res => res.data.Response)
    .then(talents => {
      const options = [];
      const talentsHash = {};
      talents.forEach(talent => {
        talentsHash[talent.TalentId] = talent;
        options.push({
          key: talent.TalentId,
          value: talent.TalentId,
          text: `${talent.FirstName} ${talent.LastName}`
        })
      });
      window.saveOptions = options;
      window.saveTalents = talentsHash;
      console.log(talentsHash);
      this.setState({ loading: false, options, talents: talentsHash });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a book by title"
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange={this.onChange}
        />
        {this.state.listItems && (
          <List>
            <List.Item>{this.state.listItems[0]}</List.Item>
            <List.Item>{this.state.listItems[1]}</List.Item>
            <List.Item>{this.state.listItems[2]}</List.Item>
          </List>
        )}
      </Form>
    );
  }
}

SearchTalentForm.propTypes = {
  onTalentSelect: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default SearchTalentForm;