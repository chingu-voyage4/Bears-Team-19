import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardBody,
  CardTitle, CardFooter } from 'reactstrap';
import KeywordList from './KeywordList/KeywordList';

function formatDate(jsonDate){
  let date = new Date(jsonDate);
  return date.toLocaleDateString();
}

class ProjectItem extends Component {
  render() {
    if (this.props.project) {
      return (
        <Card className="Project mt-3">
          <CardHeader>
            <CardTitle>{this.props.project.title ? this.props.project.title : 'Untitled'}</CardTitle>
            <KeywordList keywords={this.props.project.keywords} />
          </CardHeader>
          <CardBody>
            <CardText className="ProjectDescription">{this.props.project.description}</CardText>
          </CardBody>
          <CardFooter className="d-flex flex-row justify-content-between">
            <div className="ProjectOwner">{this.props.project.author}</div>
            <div className="ProjectDateSaved">
              {this.props.project.lastSaved? formatDate(this.props.project.lastSaved) : ''}
            </div>
          </CardFooter>
        </Card>
      );

    } else {
      return (
        <Card>
          <CardBody>No data</CardBody>
        </Card>
      );
    }
  }
}

export default ProjectItem;
