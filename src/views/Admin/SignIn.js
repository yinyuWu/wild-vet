import React, { Component } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import './SignIn.css'

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
      },
      validated: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    this.setState({
      user
    });
  }

  render() {
    return (
      <div className="signin">
        <h2 className="signin-title">Sign In</h2>
        <div className="signin-form">
          <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Form.Group controlId="formGridEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" name="email" placeholder="Enter email" value={this.state.user.email} onChange={this.handleInputChange}/>
            </Form.Group>

            <Form.Group controlId="formGridPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" name="password" placeholder="Password" value={this.state.user.password} onChange={this.handleInputChange}/>
            </Form.Group>
            <Row>
              <Col md={{ span: 4, offset: 8 }} sm={{ span: 12 }}>
                <Button variant="primary" className="signin-form-btn"
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

export default SignIn;