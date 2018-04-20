import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardText, CardBody,
  CardTitle, CardFooter } from 'reactstrap';
import KeywordList from './KeywordList/KeywordList';
import './ProjectItem.css';

function toLocaleDateStringSupportsLocales() {
  try {
    new Date().toLocaleDateString('i');
  } catch (e) {
    return e.name === 'RangeError';
  }
  return false;
}

function formatDate(jsonDate){
  let date = new Date(jsonDate);
  let dateStr;
  if (toLocaleDateStringSupportsLocales()){
    let language_tag = window.navigator.browserLanguage || window.navigator.language || 'en';
    if (!language_tag.startsWith('en')){
      language_tag = 'en';
    }
    dateStr = date.toLocaleDateString(language_tag, {day: 'numeric', month: 'short', year: 'numeric'});
  } else {
    dateStr = date.toLocaleDateString();
  }
  return dateStr;
}

const ProjectItem = (props) => {
  if (props.project) {
    let descriptionItems;
    if (props.project.description && typeof props.project.description === 'string'){
      descriptionItems = props.project.description.split(/[\r\n]+\s*/)
        .reduce((acc, paragraph) => paragraph !== '' ? acc.concat(paragraph) : acc, [])
        .map((paragraph, index) => {
        return <CardText key={index} className="ProjectDescriptionItem">{paragraph}</CardText>;
      });
    } else {
      descriptionItems = '';
    }

    return (
      <Card className="Project text-left">
        <CardHeader className="ProjectHeader">
          <CardTitle>{props.project.title ? props.project.title : 'Untitled'}</CardTitle>
          <KeywordList keywords={props.project.keywords} />
        </CardHeader>
        <CardBody className="ProjectDescription">{descriptionItems}</CardBody>
        <CardFooter className="d-flex flex-row justify-content-between text-muted bg-transparent">
          <div className="ProjectOwner">{props.project.authorName}</div>
          <div className="ProjectDateSaved">
            {props.project.lastPublished? formatDate(props.project.lastPublished) : ''}
          </div>
          <Link to={`/contact/${props.project.id}`}>Contact</Link>
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

export default ProjectItem;
