import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import AsyncReportBox from '../Form/AsyncReportBox';

class AsyncFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waitingState: 'idle',
      message: '',
      timeoutId: -1,
    };

    this.handleError = this.handleError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetTimeout() {
    if (this.state.timeoutId >= 0){
      clearTimeout(this.state.timeoutId);
      this.setState({ timeoutId: -1 });
    }    
  }

  // Assumption: this.props.asyncAction involves an axios call.
  // The error handling is based on errors produced by axios.
  handleError(err) {
    let error = `Error: ${this.props.actionName} failed. `;
    if (err.response) {
      error += `${err.response.status} ${err.response.data}`;
    } else if (err.request) {
      // no response was received
      error += 'No response from server';
    } else {
      // something else happened
      error += err.message;
    }

    // get rid of any asynchronous info message in the queue
    this.resetTimeout();

    this.setState({ waitingState: 'error', message: error });

    // update the authentication status
    if (err.response.status === 401 && this.props.auth){
      this.props.auth.logout();
    }
  }

  handleSubmit(data) {
    this.setState({ waitingState: 'onGoing', message: `${this.props.actionName}...` }, () => {
      const id = setTimeout(() => {
        this.setState({ waitingState: 'onGoing', message: 'Waiting for confirmation...'});
      }, 2000);
      this.setState({ timeoutId: id });    
    });

    // this.props.asyncAction involves an axios call (error handling assumes axios errors)
    // input: data is an object that contains the form data entered by the user
    // output: it returns a promise
    this.props.asyncAction(data)
      // if successful, update the state to enable redirect
      .then(() => {
        this.resetTimeout();
        this.setState({ waitingState: 'done' });
      })
      // if failed, change state to display error message
      .catch(this.handleError);
  }

  render() {
    // there should be only one child, a form component that handles the disabled and onSubmit props
    const formChild = React.cloneElement(React.Children.only(this.props.children), { 
      disabled: this.state.waitingState === 'onGoing', 
      onSubmit: this.handleSubmit,
    });
    
    if (this.state.waitingState === 'done'){
      return (
        <Redirect push to={this.props.redirect} />
      );
    }
    return (
      <div className="AsyncFormPage container text-center">
        <h1>{this.props.title}</h1>
        {formChild}
        <div className="mt-3">
          <AsyncReportBox state={this.state.waitingState} message={this.state.message} />
        </div>
      </div>
    );
  }
}

AsyncFormPage.propTypes = {
  asyncAction: PropTypes.func.isRequired,
  actionName: PropTypes.string.isRequired,
  redirect: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    logout: PropTypes.func.isRequired,
  }),
};

export default AsyncFormPage;
