import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ProductItem from './ProductItem';

const styles = theme => ({
  root: {
    width: '100%'
  }
});

function ProductList (props) {
  const { classes, items } = props;

  return (
    <List
      className={classes.root}
    >
      {items.map((item, i) => (
        <ProductItem
          item={item}
          key={i}
        />
      ))}
    </List>
  );
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default withStyles(styles)(ProductList);
