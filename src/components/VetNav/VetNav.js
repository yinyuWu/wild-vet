import React, { Component } from 'react'
import { Navbar, Container, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import './VetNav.css'
import logo from '../../images/logo.png'
import AuthService from '../../views/Admin/AuthService';

class VetNav extends Component {

  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.state = {
      signOutLoading: false
    }
  }

  async signOut() {
    this.setState({ signOutLoading: true });
    try {
      await Auth.signOut();
      AuthService.logout();
      this.props.toLogout();
    } catch (error) {
      console.log('error signing out: ', error);
    }
    this.setState({ signOutLoading: false });
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#"><img src={logo} alt="logo" width="40" height="40" className="d-inline-block align-top vet-nav-brand-img" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/about">About Us</Link>
                <Link className="nav-link" to="/pet-list">My Pets</Link>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="mr-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Nav>

              {AuthService.isUserLoggedIn() ? <Button disabled={this.state.signOutLoading} className="nav-sign-out" onClick={this.signOut}>{this.state.signOutLoading ? 'Logging Out...' : 'Sign Out'}</Button> : <Nav>
                <Link to="/signIn" className="nav-link nav-sign-in">Sign In</Link>
              </Nav>}

            </Navbar.Collapse>
          </Container>
        </Navbar>
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
    toLogout: () => dispatch(logout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VetNav);
