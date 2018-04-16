import React from 'react';

const LabelledTextarea = (props) => {
  const { inputId, label, inputText, onChange, disabled, labelProps, ...other } = props;
  return (
    <div className="LabelledTextarea form-group">
      <label className="d-block" htmlFor={props.inputId} {...labelProps}>
        {props.label}
      </label>
      <textarea
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

export default LabelledTextarea;