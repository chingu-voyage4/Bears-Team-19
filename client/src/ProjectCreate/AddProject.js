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
          <div>
            <label className="d-block">Title</label>
            <input type="text" ref="title" />
          </div>
          <div>
            <label className="d-block">Description</label>
            <textarea ref="description" />
          </div>
          <div>
            <label className="d-block">Keywords</label>
            <input type="text" ref="keywords" />
          </div>

          {/*} TODO
          <div>
            <label>Category</label>
            <br />
            <select ref="category"> {categoryOptions}</select>
          </div>
          */}

          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default AddProject;
