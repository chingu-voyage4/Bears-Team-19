import React from 'react';

const LabelledTextarea = (props) => {
  return (
    <div className="LabelledTextarea form-group">
      <label className="d-block" htmlFor={props.inputId}>
        {props.label}
      </label>
      <textarea
        className="form-control"
        id={props.inputId}
        value={props.inputText} 
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </div>
  );
};

export default LabelledTextarea;