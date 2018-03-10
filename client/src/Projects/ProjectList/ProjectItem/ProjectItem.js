import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import KeywordList from './KeywordList/KeywordList';

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
