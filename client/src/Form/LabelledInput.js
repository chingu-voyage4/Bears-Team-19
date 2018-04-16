import React from 'react';

const LabelledInput = (props) => {
  const { inputId, label, inputText, onChange, disabled, labelProps, ...other } = props;
  return (
    <div className="LabelledInput form-group">
      <label className="d-block" htmlFor={props.inputId} {...labelProps}>
        {props.label}
      </label>
      <input
        className="form-control"
        id={props.inputId}
        value={props.inputText} 
        onChange={props.onChange}
        disabled={props.disabled}
        {...other}
      />
    </div>
  );
};

export default LabelledInput;