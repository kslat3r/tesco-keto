import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputField: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit
    }
  },
  sortBy: {
    marginLeft: theme.spacing.unit,
    color: theme.palette.common.white
  },
  direction: {

  },
  radioLabel: {
    color: theme.palette.common.white
  },
  radio: {
    color: theme.palette.common.white
  }
});

function AppToolbar (props) {
  const { classes, opts, onChange, onSearch, onSearchDebounced } = props;

  const onChangeQuery = async (e) => {
    await onChange({
      ...opts,
      query: e.target.value
    });

    await onSearchDebounced();
  };

  const onChangeSortBy = async (sortBy) => {
    await onChange({
      ...opts,
      sortBy
    });

    await onSearch();
  };

  const onChangeDirection = async (direction) => {
    await onChange({
      ...opts,
      direction
    });

    await onSearch();
  };

  return (
    <div
      className={classes.root}
    >
      <AppBar
        position="static"
      >
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit" noWrap
          >
            Tesco Ketogenic Search
          </Typography>
          <div
            className={classes.grow}
          />
          <div
            className={classes.search}
          >
            <div
              className={classes.searchIcon}
            >
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputField
              }}
              value={opts.query}
              onChange={onChangeQuery}
            />
          </div>
          <div
            className={classes.sortBy}
          >
            <FormControlLabel
              className={classes.radioLabel}
              value="carbohydrate"
              control={
                <Radio
                  checked={opts.sortBy === 'carbohydrate'}
                  value="carbohydrate"
                  name="sortBy"
                  className={classes.radio}
                />
              }
              label={
                <Typography
                  className={classes.radioLabel}
                >
                  Carbohydrate
                </Typography>
              }
              labelPlacement="end"
              onChange={() => onChangeSortBy('carbohydrate')}
            />
          </div>
          <div
            className={classes.sortBy}
          >
            <FormControlLabel
              value="fat"
              control={
                <Radio
                  checked={opts.sortBy === 'fat'}
                  value="fat"
                  name="sortBy"
                  className={classes.radio}
                />
              }
              label={
                <Typography
                  className={classes.radioLabel}
                >
                  Fat
                </Typography>
              }
              labelPlacement="end"
              onChange={() => onChangeSortBy('fat')}
            />
          </div>
          <div
            className={classes.direction}
          >
            {opts.direction === 'ASC' ? (
              <IconButton
                color="secondary"
                onClick={() => onChangeDirection('DESC')}
              >
                <ArrowUpwardIcon />
              </IconButton>
            ) : null}
            {opts.direction === 'DESC' ? (
              <IconButton
                color="secondary"
                onClick={() => onChangeDirection('ASC')}
              >
                <ArrowDownwardIcon />
              </IconButton>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  opts: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSearchDebounced: PropTypes.func.isRequired
};

export default withStyles(styles)(AppToolbar);
