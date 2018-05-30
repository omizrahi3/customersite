import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

class TalentPage extends Component {
  state = {
    FirstName: this.props.location.state.FirstName,
    LastName: this.props.location.state.LastName,
    KnownFor: this.props.location.state.KnownFor,
    ProfilePictureReference: this.props.location.state.ProfilePictureReference,
    keys: [],
    products: {}
  }

  componentDidMount() {
    console.log('TalentPage did mount')
    const { talentid } = this.props.match.params;
    console.log(this.props.location.state);
    console.log(`talentid: ${talentid}`);

    const instance = axios.create({timeout: 3000});
    instance.defaults.headers.common['token'] = this.props.user.Token;
    instance.post('/api/api/GetProductOptionByTalent', { TalentId: '403E61E8A710460C8FCEE31F45260FCE' })
    .then(res => res.data.Response)
    .then(products => {
      console.log('this is a test');
      console.log(products);
      const keys = [];
      const productsHash = {};
      products.forEach(product => {
        productsHash[product.ProductOptionId] = product;
        keys.push(product.ProductOptionId);
      });
      window.productsHash = productsHash;
      this.setState({ keys, products: productsHash });
    });
  }

  render() {
    const { FirstName, LastName } = this.state;
    return (
      <div>
        Hello {`${FirstName} ${LastName}`}
      </div>
    )
  }
}

TalentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      talentid: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(TalentPage);
