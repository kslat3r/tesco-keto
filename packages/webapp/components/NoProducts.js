import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 2
  }
});

function NoProducts (props) {
  const { classes } = props;

  return (
    <Paper
      className={classes.root}
      elevation={1}
    >
      <Typography
        variant="h5"
        component="h3"
      >
        No products found.
      </Typography>
      <Typography
        component="p"
      >
        Please try a different search term
      </Typography>
    </Paper>
  );
}

NoProducts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NoProducts);
