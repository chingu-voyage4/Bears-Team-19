import React from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const LabelledTagInput = (props) => {
  return (
    <div className="LabelledTagInput form-group">
      <label className="w-100">
        <div className="mb-2">{props.label}</div>
        <TagsInput
          className="react-tagsinput text-left"
          value={props.value} 
          onChange={props.onChange}
          disabled={props.disabled}
        />
      </label>
    </div>
  );
};

export default LabelledTagInput;