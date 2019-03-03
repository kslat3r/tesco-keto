import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ForwardIcon from '@material-ui/icons/Forward';

const styles = theme => ({
  root: {
    margin: '2%',
    width: '96%',
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    width: 60,
    height: 60
  },
  action: {
    right: '40px'
  }
});

function ProductItem (opts) {
  const { classes, key, item } = opts;

  const carbohydrate = item.calcNutrition.calcNutrients.find(item => item.name.toLowerCase().includes('carbohydrate'));
  const fat = item.calcNutrition.calcNutrients.find(item => item.name.toLowerCase().includes('fat'));

  const goToProduct = () => {
    window.open(`https://www.tesco.com/groceries/en-GB/products/${item.details.id}`);
  };

  return (
    <ListItem
      key={key}
      alignItems="flex-start"
      className={classes.root}
    >
      <ListItemAvatar>
        <Avatar
          className={classes.avatar}
          alt={item.details.name}
          src={item.details.image}
        />
      </ListItemAvatar>
      <ListItemText
        primary={item.details.name}
        secondary={
          <span>
            {carbohydrate ? carbohydrate.valuePer100 + 'g carbohydrate per 100g' : null}
            {carbohydrate && fat ? <br/> : ''}
            {fat ? fat.valuePer100 + 'g fat per 100g' : null}
          </span>
        }
      />
      <ListItemSecondaryAction
        className={classes.action}
      >
        <IconButton
          aria-label="Go to product"
          onClick={() => goToProduct()}
        >
          <ForwardIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

ProductItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductItem);
