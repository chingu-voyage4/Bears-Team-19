import React, { Component } from 'react';
import axios from 'axios';

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      keywords: [''],
      canSubmit: false,
      error: '',
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleTitleChange(event) {
    const title = event.target.value;
    this.setState({ 
      title: title, 
      canSubmit: (title.length > 0),
    });
  }

  handleDescriptionChange(event) {
    this.setState({ 
      description: event.target.value, 
    });
  }

  handleKeywordsChange(event) {
    this.setState({ 
      keywords: [event.target.value],
    });
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
    axios.post('/api/projects', {
      title: this.state.title,
      description: this.state.description,
      keywords: this.state.keywords,
    })
      // if successful, call the success function (will redirect to browse)
      .then(res => this.props.addProject(res.body))
      // if failed, change state to display error message
      .catch(this.handleError);
  }

  render() {
    return (
      <div>
        <h1>Add New Project</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="d-block" htmlFor="title">Title</label>
            <input
              className="form-control"
              type="text"
              id="title"
              value={this.state.title} 
              onChange={this.handleTitleChange}
            />
          </div>
          <div className="form-group">
            <label className="d-block" htmlFor="description">Description</label>
            <textarea 
              className="form-control" 
              id="description"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </div>
          <div className="form-group">
            <label className="d-block" htmlFor="keywords">Keywords</label>
            <input 
              className="form-control"
              type="text"
              id="keywords"
              value={this.state.keywords[0]}
              onChange={this.handleKeywordsChange}
            />
          </div>
          <input className="btn btn-primary" type="submit" value="Submit" disabled={!this.state.canSubmit} />
        </form>
      </div>
    );
  }
}

export default AddProject;
