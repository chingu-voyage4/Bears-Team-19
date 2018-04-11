import React from 'react';

const ErrorBox = (props) => {
  // don't render anything if there is no error message
  if (props.errorMsg === '' || props.errorMsg === undefined) return null;

  return (
    <div className="ErrorBox text-danger">{props.errorMsg}</div>
  );
};

export default ErrorBox;