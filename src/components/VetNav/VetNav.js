import React, { Component } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import './VetNav.css'
import logo from '../../images/logo.png'

class VetNav extends Component {

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
								<Nav.Link href="/">Home</Nav.Link>
								<Nav.Link href="/about">About Us</Nav.Link>
								<Nav.Link href="/pet-list">My Pets</Nav.Link>
							</Nav>
							<Nav>
								<Nav.Link href="/signIn" className="nav-sign-in">Sign In</Nav.Link>
								<Nav.Link href="/signUp" className="nav-sign-up">Sign Up</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>
		)
	}
}

export default VetNav;
