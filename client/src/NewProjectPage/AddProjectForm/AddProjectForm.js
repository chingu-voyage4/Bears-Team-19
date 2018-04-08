import React, { Component } from 'react';
import axios from 'axios';
import LabelledInput from '../../Form/LabelledInput';
import LabelledTextarea from '../../Form/LabelledTextarea';
import SpinnerBox from '../../Form/SpinnerBox';
import ErrorBox from '../../Form/ErrorBox';

class AddProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      keywords: [''],
      canSubmit: false,
      saving: {
        isSaving: false,
        messageType: '',
        messageText: '',
      },
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

    const saving = { isSaving: false, messageType: 'error', messageText: error };
    this.setState({ saving: saving });
  }

  handleSubmit(e) {
    const saving = { isSaving: true, messageType: 'info', messageText: 'Saving...'};
    this.setState({ saving: saving }, () => {
      setTimeout(() => {
        const saving = { isSaving: true, messageType: 'info', messageText: 'Waiting for confirmation...'};
        this.setState({ saving: saving });
      }, 2000);      
    });
    // post
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
    const isError = (this.state.saving.messageType === 'error');
    return (
      <div>
        <h1>Add New Project</h1>
        <form>
          <LabelledInput
            inputId="title" 
            label="Title" 
            inputText={this.state.title} 
            onChange={this.handleTitleChange} 
            disabled={this.state.saving.isSaving}
          />
          <LabelledTextarea
            inputId="description" 
            label="Description" 
            inputText={this.state.description} 
            onChange={this.handleDescriptionChange} 
            disabled={this.state.saving.isSaving}
          />
          <LabelledInput
            inputId="keywords" 
            label="Keywords" 
            inputText={this.state.keywords[0]} 
            onChange={this.handleKeywordsChange} 
            disabled={this.state.saving.isSaving}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.handleSubmit}
            disabled={this.state.saving.isSaving || !this.state.canSubmit}
          >Submit</button>
          {
            this.state.saving.isSaving ?
            <SpinnerBox message={this.state.saving.messageText} /> :
            null
          }
          {
            isError ?
            <ErrorBox errorMsg={this.state.saving.messageText} /> :
            null
          }
        </form>
      </div>
    );
  }
}

export default AddProjectForm;
