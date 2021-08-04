import React, { Component } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
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
      invalidInput: {
        password: false
      },
      validated: false
      // states: ['New South Wales', 'Victoria', 'South Australia',
      //   'Western Australia', 'Northern Territory', 'Queensland', 'Tasmania']
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({
      validated: true
    })
    console.log(this.state.user);
  }

  handleInputChange(e) {
    let user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    if (e.target.name === 'password') {
      this.validate(e.target.name, e.target.value)
    }
    this.setState({
      user
    });
  }

  validate(field, value) {
    let invalid = true;
    let invalidInput = {...this.state.invalidInput}
    if (field === 'password') {
      invalid = (value.length < 5 || value.length > 20) ? true : false;
      invalidInput[field] = invalid
    }
    this.setState({
      invalidInput
    })
  }

  render() {
    return (
      <div className="signup">
        <h2 className="signup-title">Sign Up</h2>
        <div className="signup-form">
          <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" name="email" placeholder="Enter email" value={this.state.user.email} onChange={this.handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" name="password" placeholder="Password" value={this.state.user.password} onChange={this.handleInputChange} isInvalid={this.state.invalidInput.password}/>
            </Form.Group>

            <Row className="mb-3">
              <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control required placeholder="First Name" name="lastName" value={this.state.user.firstName} onChange={this.handleInputChange} />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control required placeholder="Last Name" name="firstName" value={this.state.user.lastName} onChange={this.handleInputChange} />
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
                <Button variant="primary" className="signup-form-btn"
                  onClick={this.handleSubmit}>
                  Submit
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