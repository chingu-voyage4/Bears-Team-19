import React from 'react';
import './Register.css';

const USERNAME_LENGTH_MIN = 5
const EMAIL_LENGTH_MIN = 5
const PASSWORD_LENGTH_MIN = 6

// Checks whether state values meets valid criteria
function validateInputs ({ username, email, password, confirmPassword }) {
    
    return {
        username: username.length < USERNAME_LENGTH_MIN,
        email: email.length < EMAIL_LENGTH_MIN,
        password: password.length < PASSWORD_LENGTH_MIN,
        confirmPassword: confirmPassword !== password
    }
}

// If an input is not focused has value but not complete returns false
function checkDirty (focus, {username, email, password, confirmPassword}, errors) {

    return {
        username: focus !== 'username' && errors.username && username.length > 0,
        email: focus !== 'email' && errors.email && email.length > 0,
        password: focus !== 'password' && errors.password && password.length > 0,
        confirmPassword: focus !== 'confirmPassword' && errors.confirmPassword && password.length > 0
    }
}

const Register = (props) => {
    const handleSubmit = (e) => {
        // prevent submission of form by browser
        e.preventDefault();

        // get the data from the form
        const {username, email, password } = props.inputs;

        // pass the data to the AsyncFormPage for processing
        // This will cause handleRegister to be called
        props.onSubmit({username, email, password});
    };


    const { focus } = props.inputs;
    const errors = validateInputs(props.inputs);
    const isDirty = checkDirty(focus, props.inputs, errors);
    const isEnabled = Object.keys(errors).some(e => errors[e]);

    return (
        <form className="Register d-flex flex-column">
            <div className="Register-icon mb-4">
                <i className="far fa-user fa-5x"></i>
            </div>
            <div>
                <label>Username</label>
                <input type="text"
                    placeholder="Username" 
                    className={`form-control mb-2 ${isDirty.username ? 'dirty' : ''}`}
                    value={props.inputs.username}
                    onFocus={ (e) => {props.onFocus('username')}} 
                    onBlur={props.onBlur}
                    onChange={(e) => {props.handleChange('username', e)} }
                    autoComplete="username"
                    autofill="username"
                 />
                {focus === 'username' && errors.username && <p className="error-text">{`Username must be ${USERNAME_LENGTH_MIN} characters or over.`}</p>}
            </div>
            <div>
                <label>Email</label>
                <input type="email"
                    placeholder="Email" 
                    className={`form-control mb-2 ${isDirty.email ? 'dirty' : ''}`}
                    value={props.inputs.email}
                    onFocus={ (e) => {props.onFocus('email')}} 
                    onBlur={props.onBlur}
                    onChange={(e) => {props.handleChange('email', e)} }
                    autoComplete="email"
                 />
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
                    autoComplete="new-password"
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
                        autoComplete="new-password"
                    />
                    {focus === 'confirmPassword' && errors.confirmPassword && <p className="error-text">Passwords do not match</p>}
                </div>
            }
            <button disabled={isEnabled} className={`btn btn-outline-primary ${errors.confirmPassword ? "mt-1" : "mt-3"}`} onClick={handleSubmit}>Join</button>
        </form>
    )
};

export default Register;