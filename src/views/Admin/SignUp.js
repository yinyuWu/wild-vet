import React, { Component } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Auth } from 'aws-amplify';
import './SignUp.css'

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
      },
      validated: false
      // states: ['New South Wales', 'Victoria', 'South Australia',
      //   'Western Australia', 'Northern Territory', 'Queensland', 'Tasmania']
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleSubmit(event) {
    // validate form
    const form = document.getElementById("signupForm");
    const isValid = form.checkValidity();
    if (isValid === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({
      validated: true
    })

    // call amplify api
    if (isValid) {
      const { password, address, phone, email, firstName, lastName } = this.state.user;
      await Auth.signUp({
        username: firstName,
        password,
        attributes: {
          address,
          firstName,
          lastName,
          phone,
          email
        }
      });
      window.location = '/confirm-code';
    }
  }

  handleInputChange(e) {
    let user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({
      user
    });
  }

  render() {
    return (
      <div className="signup">
        <h2 className="signup-title">Sign Up</h2>
        <div className="signup-form">
          <Form noValidate validated={this.state.validated} id="signupForm">
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" name="email" placeholder="Enter email" value={this.state.user.email} onChange={this.handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" name="password" placeholder="Password" value={this.state.user.password} onChange={this.handleInputChange} />
            </Form.Group>

            <Row className="mb-3">
              <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control required placeholder="First Name" name="firstName" value={this.state.user.firstName} onChange={this.handleInputChange} />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control required placeholder="Last Name" name="lastName" value={this.state.user.lastName} onChange={this.handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formGridPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control required placeholder="Phone Number" name="phone" value={this.state.user.phone} onChange={this.handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control required placeholder="1234 Main St" name="address" value={this.state.user.address} onChange={this.handleInputChange} />
            </Form.Group>
            <Row>
              <Col md={{ span: 4, offset: 8 }} sm={{ span: 12 }}>
                <Button variant="primary" className="signup-form-btn" onClick={this.handleSubmit}>
                  Sign Up
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}

export default SignUp;