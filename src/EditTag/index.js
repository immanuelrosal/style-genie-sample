import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withRouter
} from "react-router-dom";

import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

import { withStyles } from '@material-ui/core/styles';

import TagsAppBar from './AppBar'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: 8,
  },
  menu: {
    width: 200,
  },
});

class Edit extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            description: '',
            isFormSubmitting: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.state.id = this.props.match.params.id;
        const url = `http://localhost:4000/tags/${this.state.id}`
        axios.get(url).then(response => {
            this.setState({ 
                name: response.data.name, 
                description: response.data.description
            });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onSubmit(e) {
        e.preventDefault();
        this.state.isFormSubmitting = true;
        console.log(`The values are ${this.state.name}, ${this.state.description}`);

        const payload = {
            name: this.state.name,
            description: this.state.description
        };

        axios.post(`http://localhost:4000/tags/update/${this.state.id}`, payload)
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
                            <Button type="submit" color="primary" variant="contained" 
                                disabled={this.state.isFormSubmitting}>
                                {this.state.isFormSubmitting ? 'Please wait...' : 'Edit'}
                            </Button>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

Edit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Edit));