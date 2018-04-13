import React from 'react';
import './Contact.css';

const ContactForm = (props) => {

    return (
        <div className="container-fluid">
            <div className="col-xl-5 col-lg-5 col-md-7 col-sm-10 col-xs-11 my-5 mx-auto">
                <div className="card contact-card">
                    <div class="card-header text-black bg-light text-left">
                       {props.projectTitle || "Project Name"}
                    </div>
                    <div class="card-body text-left">
                        <form>
                            <div className="form-group">
                                <label for="subjectLine">Subject</label>
                                <input  type="text" 
                                className="form-control" 
                                id="subjectLine" 
                                placeholder="Enter Subject"
                                onChange={(e)=>{ props.handleChange('subject', e)}}
                                />
                            </div>
                            <div class="form-group">
                                <label for="exampleTextarea">Message</label>
                                <textarea className="form-control" 
                                id="exampleTextarea" 
                                rows="3"
                                onChange={(e)=>{ props.handleChange('body', e)}}
                                ></textarea>
                            </div>
                            <div>
                                <button type="button" 
                                className="btn btn-primary btn-block"
                                onClick={()=> {props.handleSubmit()}}
                                >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ContactForm;