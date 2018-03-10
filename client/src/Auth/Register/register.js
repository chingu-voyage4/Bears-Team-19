import React from 'react';
import avatar from './avatar.png';
import './register.css';

const Register = (props) => {
    return (
        <div className="container-fluid d-flex flex-column my-auto">
                <div className="d-flex flex-column col-lg-5 col-md-3 col-sm-8 mx-auto justify-content-center register-wrapper">
                    <div className="align-center pt-2 mb-3">
                        <h2 className="register-text">Register</h2>
                    </div>
                    <img src={avatar} className="align-self-center my-3" width="120px" />
                    <label>Username</label>
                    <input type="text" placeholder="Username" className="form-control mb-2" value={props.inputs.username} onChange={(e) => {props.handleChange('username', e)} } />
                    <label>Password</label>
                    <input type="text" placeholder="Password" className="form-control mb-2" value={props.inputs.password} onChange={(e) => {props.handleChange('password', e)} }/>
                    <label>Confirm Password</label>
                    <input type="text" placeholder="Confirm Password" className="form-control mb-2" value={props.inputs.confirmPassword} onChange={(e) => {props.handleChange('confirmPassword', e)} }/>
                    <button className="btn btn-outline-primary">Submit</button>
                </div>
        </div>
    )
};

export default Register;