import React from 'react';
// https://www.flaticon.com/free-icon/circular-avatar_108331
import avatar from './avatar.png';
import './Register.css';

const USERNAME_LENGTH_MIN = 5
const PASSWORD_LENGTH_MIN = 6

// Checks whether state values meets valid criteria
function validateInputs ({ username, password, confirmPassword }) {
    
    return {
        username: username.length < USERNAME_LENGTH_MIN,
        password: password.length < PASSWORD_LENGTH_MIN,
        confirmPassword: confirmPassword !== password
    }
}

// If an input is not focused has value but not complete returns false
function checkDirty (focus, {username, password, confirmPassword}, errors) {

    return {
        username: focus !== 'username' && errors.username && username.length > 0,
        password: focus !== 'password' && errors.password && password.length > 0,
        confirmPassword: focus !== 'confirmPassword' && errors.confirmPassword && password.length > 0
    }
}

const Register = (props) => {

    const { focus } = props.inputs;
    const errors = validateInputs(props.inputs);
    const isDirty = checkDirty(focus, props.inputs, errors);
    const isEnabled = Object.keys(errors).some(e => errors[e]);

    return (
        <div className="container-fluid d-flex flex-column my-auto">
                <div className="d-flex flex-column col-xl-4 col-lg-5 col-md-6 col-sm-8 col-9 mx-auto">
                    <div className="align-center pt-2 mb-3">
                        <h2 className="register-text">Register</h2>
                    </div>
                    <img alt="avatar icon" src={avatar} className="align-self-center my-3" width="120px" />
                    <div>
                        <label>Username</label>
                        <input type="text"
                            placeholder="Username" 
                            className={`form-control mb-2 ${isDirty.username ? 'dirty' : ''}`}
                            value={props.inputs.username}
                            onFocus={ (e) => {props.onFocus('username')}} 
                            onBlur={props.onBlur}
                            onChange={(e) => {props.handleChange('username', e)} }
                         />
                        {focus === 'username' && errors.username && <p className="error-text">{`Username must be ${USERNAME_LENGTH_MIN} characters or over.`}</p>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className={`form-control mb-2 ${isDirty.password ? 'dirty' : '' }`}
                            value={props.inputs.password} 
                            onFocus={ (e) => {props.onFocus('password')}} 
                            onBlur={props.onBlur}
                            onChange={(e) => {props.handleChange('password', e)} }
                        />
                        {focus === 'password' && errors.password && <p className="error-text">{`Passwords must be ${PASSWORD_LENGTH_MIN} characters or over.`}</p>}
                    </div>
                    { props.inputs.password.length >= PASSWORD_LENGTH_MIN && 
                        <div>
                            <label>Confirm Password</label>
                            <input 
                                type="password" 
                                placeholder="Confirm Password" 
                                className={`form-control mb-2 ${isDirty.confirmPassword ? 'dirty' : ''}`} 
                                value={props.inputs.confirmPassword}
                                onFocus={ (e) => {props.onFocus('confirmPassword')}}  
                                onBlur={props.onBlur}
                                onChange={(e) => {props.handleChange('confirmPassword', e)} }
                            />
                            {focus === 'confirmPassword' && errors.confirmPassword && <p className="error-text">Passwords do not match</p>}
                        </div>
                    }
                    <button disabled={isEnabled} className={`btn btn-outline-primary ${errors.confirmPassword ? "mt-1" : "mt-3"}`} onClick={props.handleSubmit}>Submit</button>
                </div>
        </div>
    )
};

export default Register;