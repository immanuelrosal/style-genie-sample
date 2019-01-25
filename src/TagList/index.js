import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import Checkbox from '@material-ui/core/Checkbox';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

import TagsAppBar from './AppBar';

const CreateTagLink = props => <Link to="/create" {...props} />
// import Create from './CreateTag';
// import Edit from './EditTag';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class TagListItem extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this)
  }

  onDelete(){
    const id = this.props.tag._id;
    this.props.onHandleDelete(id);
  }

  render() {
    const { classes, tag } = this.props;

    return (
      <ListItem dense button className={classes.listItem}
        component={({innerRef,...props}) => <Link {...props} to={`/edit/${tag._id}`} />}>
        <ListItemText primary={`${tag.name}`} secondary={`${tag.description}`} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Remove"
            onClick={this.onDelete}>
            <RemoveIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: [] };

    this.onDelete = this.onDelete.bind(this)
  }

  componentDidMount(){
    axios.get('http://localhost:4000/tags')
      .then(response => {
        this.setState({ tags: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onDelete(id){
    console.log('handleDelete');
    axios.get(`http://localhost:4000/tags/delete/${id}`)
      .then(
        axios.get('http://localhost:4000/tags')
        .then(response => {
          this.setState({ tags: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
          <TagsAppBar></TagsAppBar>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {!this.state.tags.length ? <h3>No tags yet. Please create some tags.</h3>:
            <List style={{flex: 1, maxWidth: 480}}>
              {this.state.tags.map( tag => (
                <Fragment key={tag._id}>
                  <TagListItem 
                    classes={classes}
                    tag={tag}
                    onHandleDelete={this.onDelete}></TagListItem>
                  <Divider />
                </Fragment>
              ))}
            </List>
            }
          </div>
          <Fab variant="round" color="primary" aria-label="Add" className={classes.fab} component={CreateTagLink} to="/create" exact="true">
            <AddIcon />
          </Fab>
        </div>
    );
  }
}

TagList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TagList);
