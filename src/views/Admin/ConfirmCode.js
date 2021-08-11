import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import './ConfirmCode.css'
import { Auth } from 'aws-amplify';

class ConfirmCode extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '',
      error: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResent = this.handleResent.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      code: e.target.value
    });
  }

  async handleResent() {
    const username = window.localStorage.getItem('username');
    try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }
  }

  async handleSubmit() {
    const username = window.localStorage.getItem('username');
    try {
      await Auth.confirmSignUp(username, this.state.code);
      window.location = '/';
    } catch (err) {
      if (err.code === "CodeMismatchException") {
        let error = { msg: err.message };
        this.setState({ error });
      }
      console.log('error confirming sign up', err);
    }
  }

  render() {
    return (
      <div className="confirm">
        <div className="confirm-form">
          <Form>
            <Form.Group className="mb-3" controlId="confirmCode">
              <Form.Label>Confirm Code</Form.Label>
              <Form.Control required className={this.state.error.msg && "confirm-form-input-error"} name="code" placeholder="Enter Code" value={this.state.code} onChange={this.handleInputChange} />
              {this.state.error.msg && <div className="confirm-form-error">{this.state.error.msg}</div>}
            </Form.Group>

            <div className="confirm-form-btn">
              <Button size="sm" variant="primary"
                onClick={this.handleResent}>
                Resent Code
              </Button>
              <Button size="sm" variant="primary"
                onClick={this.handleSubmit}>
                Confirm Code
              </Button>
            </div>

          </Form>
        </div>
      </div>
    )
  }
}

export default ConfirmCode;