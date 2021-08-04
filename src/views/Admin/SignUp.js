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
				name: '',
				address: '',
			},
			states: ['New South Wales', 'Victoria', 'South Australia', 
							'Western Australia', 'Northern Territory', 'Queensland', 'Tasmania']
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleSubmit() {
		console.log('submit')
		// this.setState({

		// })
	}

	handleInputChange() {
		console.log('input change')
	}

	render() {
		return (
			<div className="signup">
				<h2 className="signup-title">Sign Up</h2>
				<div className="signup-form">
					<Form>
						<Row className="mb-3">
							<Col sm={12} md={6}>
								<Form.Group controlId="formGridEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" placeholder="Enter email" />
								</Form.Group>
							</Col>
							<Col sm={12} md={6}>
								<Form.Group controlId="formGridPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" placeholder="Password" />
								</Form.Group>
							</Col>
						</Row>

						<Form.Group className="mb-3" controlId="formGridName">
							<Form.Label>Name</Form.Label>
							<Form.Control placeholder="Name" />
						</Form.Group>

						<Form.Group className="mb-3" controlId="formGridAddress1">
							<Form.Label>Address</Form.Label>
							<Form.Control placeholder="1234 Main St" />
						</Form.Group>

						<Row className="mb-3">
							<Form.Group as={Col} controlId="formGridCity">
								<Form.Label>City</Form.Label>
								<Form.Control />
							</Form.Group>

							<Form.Group as={Col} controlId="formGridState">
								<Form.Label>State</Form.Label>
								<Form.Select>
									{ this.state.states.map(state => <option key={state} value={state}>{ state }</option>) }
								</Form.Select>
							</Form.Group>

							<Form.Group as={Col} controlId="formGridZip">
								<Form.Label>Zip</Form.Label>
								<Form.Control />
							</Form.Group>
						</Row>

						<Form.Group className="mb-3" id="formGridCheckbox">
							<Form.Check type="checkbox" label="Check me out" />
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