import React, { Component } from 'react';
//import ProjectItem from './ProjectItem/ProjectItem';

class AddProject extends Component {

constructor(){
  super();
  this.state={
    newProject: {}
  }
}

  static defaultProps = {
    categories: ['web design', 'web development', 'mobile development']
}
handleSubmit(e){
  if(this.refs.title.value=== ''){
    alert('Title is required')
  }else{
    this.setState({newProject:{
      title:this.refs.title.value,
      author:this.refs.author.value,
      description:this.refs.description.value,
      keywords:this.refs.keywords.value,
      category: this.refs.category.value

    }},function(){
      this.props.addProject(this.state.newProject);
    });

  }
  e.preventDefault();
}

  render() {
    let categoryOptions = this.props.categories.map(category =>{
      return <option key={category} value={category}>{category}</option>
    });


    return (
      <div >
        <h1>Add New Project</h1>

        <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <label>Title</label><br />
          <input type="text" ref="title" />
        </div>
        <div>
          <label>Author</label><br />
          <input type="text" ref="author" />
        </div>
        <div>
        <label>Description</label><br />
        <input type="text" ref="description" />
      </div>
      <div>
      <label>Keywords</label><br />
      <input type="text" ref="keywords" />
    </div>


        <div>
          <label>Category</label><br />
          <select ref="category" > {categoryOptions}</select>
        </div>




        <input type="submit" value="submit" />

        </form>

      </div>
    );
  }
}

export default AddProject;
