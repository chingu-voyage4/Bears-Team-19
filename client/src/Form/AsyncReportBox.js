import React from 'react';
import SpinnerBox from './SpinnerBox';
import ErrorBox from './ErrorBox';

const AsyncReportBox = (props) => {
  let content = null; // default: nothing to report
  if (props.state === 'onGoing'){
    content = (
      <SpinnerBox message={props.message} />
    );
  } else if (props.state === 'error'){
    content = (
      <ErrorBox errorMsg={props.message} />
    );
  }

  return (
    <div className="AsyncReportBox">
      {content}
    </div>
  );
};

export default AsyncReportBox;