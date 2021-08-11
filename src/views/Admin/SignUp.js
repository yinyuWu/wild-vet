import React, { Component } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Auth } from 'aws-amplify';
import Joi from 'joi-browser';
import './SignUp.css'

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      schema: {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().min(8).max(128).label("Password"),
        address: Joi.string().required().label("Address"),
        email: Joi.string().email().required().label("Email"),
        phone: Joi.string().required().label("Phone Number"),
        postcode: Joi.string().required().label("Postcode")
      },
      user: {
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        postcode: ''
      },
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  async handleSubmit() {
    // validate form
    const errors = this.validate();
    if (errors) return;

    // call amplify signup api

    const { username, password, address, phone, email, postcode } = this.state.user;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          address,
          phone_number: `+61${phone}`,
          email,
          'custom:postcode': postcode
        }
      });
      window.location = '/confirm-code';
      window.localStorage.setItem('username', username);

    } catch (err) {
      console.log(err);
      if (err.code === "UsernameExistsException") {
        let errors = { ...this.state.errors };
        errors.username = err.message;
        this.setState({ errors });
      }
    }
  }

  handleInputChange(e) {
    let errors = { ...this.state.errors };
    const errorMsg = this.validateField(e.target.name, e.target.value);
    if (errorMsg) {
      errors[e.target.name] = errorMsg;
    } else {
      delete errors[e.target.name];
    }

    let user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({
      user,
      errors
    });
  }

  validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.user, this.state.schema, options);
    if (!error) return null;

    const errors = {};
    error.details.map(e => errors[e.path[0]] = e.message);
    console.log(errors);
    this.setState({ errors });
    return errors;
  }

  validateField(name, value) {
    const fieldValue = { [name]: value };
    const schema = { [name]: this.state.schema[name] };
    const { error } = Joi.validate(fieldValue, schema);
    if (!error) return null;
    return error.details[0].message;
  }

  render() {
    return (
      <div className="signup">
        <h2 className="signup-title">Sign Up</h2>
        <div className="signup-form">
          <Form noValidate id="signupForm">
            <Form.Group className="mb-3" controlId="formGridUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control className={this.state.errors.username && "signup-form-input-error"} required name="username" placeholder="Username" value={this.state.user.username} onChange={this.handleInputChange} />
              {this.state.errors.username && <div className="signup-form-error">{this.state.errors.username}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control className={this.state.errors.email && "signup-form-input-error"} required type="email" name="email" placeholder="Email" value={this.state.user.email} onChange={this.handleInputChange} />
              {this.state.errors.email && <div className="signup-form-error">{this.state.errors.email}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control className={this.state.errors.password && "signup-form-input-error"} required type="password" name="password" placeholder="Password" value={this.state.user.password} onChange={this.handleInputChange} />
              {this.state.errors.password && <div className="signup-form-error">{this.state.errors.password}</div>}
            </Form.Group>

            <Form.Group controlId="formGridPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control className={this.state.errors.phone && "signup-form-input-error"} required placeholder="Phone Number" name="phone" value={this.state.user.phone} onChange={this.handleInputChange} />
            </Form.Group>
            {this.state.errors.phone && <div className="signup-form-error">{this.state.errors.phone}</div>}

            <Row>
              <Form.Group as={Col} md="8" xs="6" className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control className={this.state.errors.address && "signup-form-input-error"} required placeholder="Address" name="address" value={this.state.user.address} onChange={this.handleInputChange} />
                {this.state.errors.address && <div className="signup-form-error">{this.state.errors.address}</div>}
              </Form.Group>
              <Form.Group as={Col} md="4" xs="6" className="mb-3" controlId="formGridPostcode">
                <Form.Label>Postcode</Form.Label>
                <Form.Control className={this.state.errors.postcode && "signup-form-input-error"} required placeholder="Postcode" name="postcode" value={this.state.user.postcode} onChange={this.handleInputChange} />
                {this.state.errors.postcode && <div className="signup-form-error">{this.state.errors.postcode}</div>}
              </Form.Group>
            </Row>

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