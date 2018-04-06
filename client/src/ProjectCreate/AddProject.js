import React, { Component } from 'react';
import axios from 'axios';

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      newProject: {},
      error: '',
    };
  }

  handleError(err) {
    console.log('handleError');
    let error = 'Error: The project was not saved. ';
    if (err.response) {
      error += `${err.response.status} ${err.response.body}`;
    } else if (err.request) {
      // no response was received
      error += 'No response from server';
    } else {
      // something else happened
      error += err.message;
    }

    this.setState({ error: error });
  }

  handleSubmit(e) {
    /*
    if (this.refs.title.value === '') {
      alert('Title is required');
    } else {
      this.setState(
        {
          newProject: {
            title: this.refs.title.value,
            description: this.refs.description.value,
            keywords: this.refs.keywords.value
          }
        },
        function() {
          this.props.addProject(this.state.newProject);
          //console.log('porject obj' + this.props);
        }
      );
    }
    e.preventDefault();
    */
    axios.post('/api/projects', this.state.newProject)
      // if successful, call the success function (will redirect to browse)
      .then(res => this.props.addProject(res.body))
      // if failed, change state to display error message
      .catch(this.handleError.bind(this));
  }

  render() {
    return (
      <div>
        <h1>Add New Project</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label className="d-block" htmlFor="title">Title</label>
            <input className="form-control" type="text" ref="title" id="title" />
          </div>
          <div className="form-group">
            <label className="d-block" htmlFor="description">Description</label>
            <textarea className="form-control" ref="description" id="description" />
          </div>
          <div className="form-group">
            <label className="d-block" htmlFor="keywords">Keywords</label>
            <input className="form-control" type="text" ref="keywords" id="keywords" />
          </div>
          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddProject;
