import React from 'react';
import PropTypes from 'prop-types';
import './ContactForm.css';

const ContactForm = (props) => {
    return (
        <div className="container-fluid">
            <div className="mx-auto">
                <h2>{`Contact ${props.authorName}`}</h2>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-7 col-sm-10 col-xs-11 my-3 mx-auto">
                <div className="card contact-card">
                    <div className="card-header text-black bg-light text-left">
                       {props.projectTitle}
                    </div>
                    <div className="card-body text-left">
                        <form>
                            <div className="form-group">
                                <label htmlFor="subjectLine">Subject</label>
                                <input  type="text" 
                                    className="form-control" 
                                    id="subjectLine" 
                                    placeholder="Enter Subject"
                                    onChange={(e)=>{ props.handleChange('subject', e)}}
                                    value={props.subject}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleTextarea">Message</label>
                                <textarea className="form-control" 
                                    id="exampleTextarea" 
                                    rows="3"
                                    onChange={(e)=>{ props.handleChange('body', e)}}
                                    value={props.body}
                                ></textarea>
                            </div>
                            <div>
                                <button type="button" 
                                    className="btn btn-primary btn-block"
                                    onClick={()=> {props.handleSubmit()}}
                                    disabled={props.disabled}
                                    >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

ContactForm.defaultProps = {
    authorName: 'No Author',
    projectTitle: 'No Project Title',
    disabled: true,
}


ContactForm.propTypes = {
    authorName: PropTypes.string,
    projectTitle: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    subject: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
}


export default ContactForm;