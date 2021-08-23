import React, { Component } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { login } from '../../actions';
import { Auth } from 'aws-amplify';
import AuthService from './AuthService';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import './SignIn.css'
class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
      },
      schema: {
        password: Joi.string().required().label("Password"),
        email: Joi.string().required().label("Email"),
      },
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validate = this.validate.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  async handleSubmit() {

    const errors = this.validate();
    if (errors) return;
    
    // call amplify sign in api
    const { email, password } = this.state.user;
    try {
      await Auth.signIn({
        username: email,
        password
      });

      // store user info in redux store
      const user = await Auth.currentAuthenticatedUser();
      console.log('user: ', user);
      AuthService.recordLogin(user.attributes.email);
      AuthService.recordUserName(user.username);
      this.props.toLogin(user);
      this.props.history.push('/');
    } catch (err) {
      console.log(err);
      if (err.code) {
        let errors = { ...this.state.errors };
        errors.password = err.message;
        errors.email = err.message;
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
      user
    });
  }

  validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.user, this.state.schema, options);
    if (!error) return null;

    const errors = {};
    error.details.map(e => errors[e.path[0]] = e.message);
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
      <div className="signin">
        <h2 className="signin-title">Sign In</h2>
        <div className="signin-form">
          <Form>
            <Form.Group controlId="formGridEmail" className="mb-3">
              <Form.Label>Email or Username</Form.Label>
              <Form.Control className={this.state.errors.email && "signin-form-input-error"} required type="email" name="email" placeholder="Enter email" value={this.state.user.email} onChange={this.handleInputChange}/>
              {this.state.errors.email && <div className="signin-form-error">{this.state.errors.email}</div>}
            </Form.Group>

            <Form.Group controlId="formGridPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control className={this.state.errors.password && "signin-form-input-error"} required type="password" name="password" placeholder="Password" value={this.state.user.password} onChange={this.handleInputChange}/>
              {this.state.errors.password && <div className="signin-form-error">{this.state.errors.password}</div>}
            </Form.Group>
            <p className="signin-form-msg">If you're new to wild vet, please <Link to="/signup">sign up</Link> first</p>
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

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toLogin: (user) => dispatch(login(user))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);