import React from 'react';
import TagsInput from 'react-tagsinput';
import './LabelledTagInput.css';

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
          aria-describedby="taginput-help"
        />
        <small className="form-text text-muted text-left LabelledTagInput_Help" id="taginput-help">Use Tab or Enter to add your tag to the list</small>
      </label>
    </div>
  );
};

export default LabelledTagInput;