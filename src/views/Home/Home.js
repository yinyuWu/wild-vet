import React, { Component } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './Home.css'
import homePet from '../../images/home-pet.jpeg'

class Home extends Component {
	render() {
		return (
			<div className="home">
				<Container>
					<Row>
						<Col sm={8}><img src={homePet} alt="home-pet" className="home-pet-img" /></Col>
						<Col sm={4}><h1 className="home-pet-title">The Wild Vet Veterinary Clinic</h1></Col>
					</Row>
				</Container>
				<div className="home-cases">
					<Card>
						<Card.Header>Case 1</Card.Header>
						<Card.Body>
							<Card.Title>Case Title</Card.Title>
							<Card.Text>
								Case Text
							</Card.Text>
							<Button variant="primary">Case Details</Button>
						</Card.Body>
					</Card>
					<Card>
						<Card.Header>Case 2</Card.Header>
						<Card.Body>
							<Card.Title>Case Title</Card.Title>
							<Card.Text>
								Case Text
							</Card.Text>
							<Button variant="primary">Case Details</Button>
						</Card.Body>
					</Card>
				</div>
			</div>

		)
	}
}

export default Home;
