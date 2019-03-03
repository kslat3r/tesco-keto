import React from 'react';
import PropTypes from 'prop-types';
import AppToolbar from '../components/AppToolbar';
import ProductList from '../components/ProductList';
import NoProducts from '../components/NoProducts';
import getProducts from '../lib/get-products';

class IndexPage extends React.Component {
  static propTypes = {
    opts: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired
  };

  constructor (props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  static async getInitialProps () {
    const opts = {
      query: 'bread',
      sortBy: 'carbohydrate',
      direction: 'ASC'
    };

    const items = await getProducts(opts);

    return { opts, items };
  }

  componentWillMount () {
    this.setState({
      opts: this.props.opts,
      items: this.props.items
    });
  }

  async onChange (opts) {
    this.setState({ opts })

    const items = await getProducts(opts);

    this.setState({ items });
  }

  render () {
    const { opts, items } = this.state;

    return (
      <React.Fragment>
        <AppToolbar
          opts={opts}
          onChange={this.onChange}
        />

        {items.length > 0 ? (
          <ProductList
            items={items}
          />
        ) : null}

        {items.length === 0 ? (
          <NoProducts />
        ) : null}
      </React.Fragment>
    );
  }
}

export default IndexPage;
