import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const KeywordList = (props) => {
  // if there are no keywords, don't add anything to the HTML
  if (!props.keywords || props.keywords.length == 0){
    return null;
  }

  let keywords = props.keywords.map((keyword, id) => {
    return (
        <li key={id} className="ProjectKeyword border rounded px-2 m-1">{keyword}</li>
      );
  });

  return (
    <ul className="ProjectKeywordList list-unstyled d-flex justify-content-center mb-0">
      {keywords}
    </ul>  
  );    
};

const ValidProject = (props) => {
  return (
    <Card className="Project">
      <CardHeader>
        <CardTitle>{props.project.title ? props.project.title : 'Untitled'}</CardTitle>
        <KeywordList keywords={props.project.keywords} />
      </CardHeader>
      <CardBody>
      </CardBody>
    </Card>
  );
};

const NoProject = () => {
  return (
    <Card>
      <CardBody>No data</CardBody>
    </Card>
  );
};

class ProjectItem extends Component {
  render() {
    /*
    <strong>  id : </strong>  {this.props.project.id}- <strong>title : </strong> {this.props.project.title} -
    <strong>category :</strong> {this.props.project.category} -<strong>descript.:</strong>
    {this.props.project.description}
    */
    if (this.props.project) {
      return <ValidProject project={this.props.project}/>         
    } else {
      return <NoProject />
    }
  }
}

export default ProjectItem;
