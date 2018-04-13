import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabelledInput from '../../Form/LabelledInput';
import LabelledTextarea from '../../Form/LabelledTextarea';
import LabelledTagInput from '../../Form/LabelledTagInput';

class AddProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      keywords: [],
      canSubmit: false,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleKeywordsChange(tags) {
    this.setState({ 
      keywords: tags,
    });
  }

  handleSubmit(e) {
    this.props.onSubmit({
      title: this.state.title,
      description: this.state.description,
      keywords: this.state.keywords,
    });
  }

  render() {
    return (
      <form>
        <LabelledInput
          inputId="title" 
          label="Title" 
          inputText={this.state.title} 
          onChange={this.handleTitleChange} 
          disabled={this.props.disabled}
        />
        <LabelledTextarea
          inputId="description" 
          label="Description" 
          inputText={this.state.description} 
          onChange={this.handleDescriptionChange} 
          disabled={this.props.disabled}
        />
        <LabelledTagInput
          inputId="keywords" 
          label="Keywords" 
          value={this.state.keywords} 
          onChange={this.handleKeywordsChange} 
          disabled={this.props.disabled}
        />
        <div className="form-group">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.handleSubmit}
            disabled={this.props.disabled || !this.state.canSubmit}
          >Submit</button>
        </div>
      </form>
    );
  }
}

AddProjectForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddProjectForm;
