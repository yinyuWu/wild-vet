import React, { Component } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import './VetNav.css'
import logo from '../../images/logo.png'

class VetNav extends Component {

  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  async signOut() {
    try {
      await Auth.signOut();
      this.props.toLogout();
    } catch (error) {
      console.log('error signing out: ', error);
    }
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
              </Nav>
              {this.props.isLogin ? <Button onClick={this.signOut}>Sign Out</Button> : <Nav>
                <Link to="/signIn" className="nav-link nav-sign-in">Sign In</Link>
                <Link to="/signUp" className="nav-link nav-sign-up">Sign Up</Link>
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
