import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
  
});

const BackToIndexLink = props => <Link to="/" {...props} />

function TagsAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Back" component={BackToIndexLink}>
            <ArrowBack/>
          </IconButton>
          <Typography className={classes.title} variant="title" color="inherit" noWrap>
            Create Tag
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

TagsAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TagsAppBar);