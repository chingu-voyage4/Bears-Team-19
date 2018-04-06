import React, { Component } from 'react';
//import ProjectItem from './ProjectItem/ProjectItem';

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      newProject: {}
    };
  }

  static defaultProps = {
    categories: ['web design', 'web development', 'mobile development']
  };
  handleSubmit(e) {
    if (this.refs.title.value === '') {
      alert('Title is required');
    } else {
      this.setState(
        {
          newProject: {
            title: this.refs.title.value,
            description: this.refs.description.value,
            keywords: this.refs.keywords.value
            //category: this.refs.category.value TODO
          }
        },
        function() {
          this.props.addProject(this.state.newProject);
          //console.log('porject obj' + this.props);
        }
      );
    }
    e.preventDefault();
  }

  render() {
    let categoryOptions = this.props.categories.map(category => {
      return (
        <option key={category} value={category}>
          {category}
        </option>
      );
    });

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

          {/*} TODO
          <div>
            <label>Category</label>
            <br />
            <select ref="category"> {categoryOptions}</select>
          </div>
          */}

          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddProject;
