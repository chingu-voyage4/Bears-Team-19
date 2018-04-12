import React from 'react';

const LabelledInput = (props) => {
  return (
    <div className="LabelledInput form-group">
      <label className="d-block" htmlFor={props.inputId}>
        {props.label}
      </label>
      <input
        className="form-control"
        type="text"
        id={props.inputId}
        value={props.inputText} 
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </div>
  );
};

export default LabelledInput;