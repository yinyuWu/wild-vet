import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import './ConfirmCode.css'
import { Auth } from 'aws-amplify';

class ConfirmCode extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      code: e.target.value
    });
  }

  async handleSubmit() {
    try {
      await Auth.confirmSignUp(this.props.username, this.state.code);
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  render() {
    return (
      <div className="confirm">
        <div className="confirm-form">
          <Form>
            <Form.Group className="mb-3" controlId="confirmCode">
              <Form.Label>Confirm Code</Form.Label>
              <Form.Control required name="code" placeholder="Enter Code" value={this.state.code} onChange={this.handleInputChange} />
            </Form.Group>
            <Button variant="primary" className="confirm-form-btn"
              onClick={this.handleSubmit}>
              Confirm Code
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default ConfirmCode;