import React from 'react';
import Spinner from './Spinner';

const SpinnerBox = (props) => {
  return (
    <div className="SpinnerBox d-flex justify-content-around align-items-center">
      <div>{props.message}</div>
      <Spinner />
    </div>
  );
};

export default SpinnerBox;