import React from 'react';

const KeywordList = (props) => {
  // if there are no keywords, don't add anything to the HTML
  if (!props.keywords || !Array.isArray(props.keywords) || props.keywords.length === 0){
    return null;
  }

  let keywords = props.keywords.map((keyword, id) => {
    return (
        <li key={id} className="Keyword border rounded px-2 mr-1">{keyword}</li>
      );
  });

  return (
    <ul className="KeywordList list-unstyled d-flex justify-content-start mb-0">
      {keywords}
    </ul>  
  );    
};

export default KeywordList;