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
      let descriptionItems;
      if (this.props.project.description && typeof this.props.project.description === 'string'){
        descriptionItems = this.props.project.description.split(/\r\n\s*/)
          .reduce((acc, paragraph) => paragraph !== '' ? acc.concat(paragraph) : acc, [])
          .map((paragraph, index) => {
          return <CardText key={index} className="ProjectDescriptionItem">{paragraph}</CardText>;
        });
      } else {
        descriptionItems = '';
      }

      return (
        <Card className="Project mt-3 text-left">
          <CardHeader>
            <CardTitle>{this.props.project.title ? this.props.project.title : 'Untitled'}</CardTitle>
            <KeywordList keywords={this.props.project.keywords} />
          </CardHeader>
          <CardBody className="ProjectDescription">{descriptionItems}</CardBody>
          <CardFooter className="d-flex flex-row justify-content-between text-muted">
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
