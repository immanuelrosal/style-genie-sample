import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withRouter
} from "react-router-dom";

import axios from 'axios';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import TagsAppBar from './AppBar'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//   },
  dense: {
    marginTop: 8,
  },
  menu: {
    width: 200,
  },
});

class Create extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            description: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onSubmit(e) {
        e.preventDefault();
        console.log(`The values are ${this.state.name}, ${this.state.description}`);

        const payload = {
            name: this.state.name,
            description: this.state.description
        };

        axios.post('http://localhost:4000/tags/add', payload)
            .then( (res) => {
                console.log(res.data)
                this.setState({
                    name: '',
                    description: ''
                })
                this.props.history.push('/');
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <TagsAppBar></TagsAppBar>
                <div style={{marginTop: 10, display: 'flex', justifyContent: 'center'}}>
                    <form onSubmit={this.onSubmit}>
                        <TextField
                            id="tag-name"
                            label="Name"
                            // style={{ margin: 8 }}
                            className={classes.textField}
                            placeholder="Enter Name.."
                            // helperText="Full width!"
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="tag-description"
                            label="Description"
                            placeholder="Enter Description.."
                            multiline
                            rowsMax="4"
                            value={this.state.description}
                            onChange={this.handleChange('description')}
                            fullWidth
                            className={classes.textField}
                            margin="normal"
                            // helperText="hello"
                            variant="outlined"
                        />

                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button type="submit" color="primary" variant="contained">Create</Button>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Create));