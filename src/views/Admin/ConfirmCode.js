import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../../actions';
import { Auth } from 'aws-amplify';
import './ConfirmCode.css'
class ConfirmCode extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '',
      error: {},
      loading: false
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
    this.setState({ loading: true });
    const username = window.localStorage.getItem('username');
    try {
      await Auth.confirmSignUp(username, this.state.code);
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('email');
      this.setState({ loading: false })
      this.props.history.push('/signin');
    } catch (err) {
      this.setState({ loading: false })
      if (err.code === "CodeMismatchException") {
        let error = { msg: err.message };
        this.setState({ error });
      }
      console.log('error confirming code: ', err);
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
              <Button disabled={this.state.loading} size="sm" variant="primary"
                onClick={this.handleResent}>
                {this.state.loading ? 'Loading...' : 'Resent Code'}
              </Button>
              <Button disabled={this.state.loading} size="sm" variant="primary"
                onClick={this.handleSubmit}>
                {this.state.loading ? 'Loading...' : 'Confirm Code'}
              </Button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCode);