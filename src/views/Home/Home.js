import React, { Component } from 'react'
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'
import homePet from '../../images/home-pet.jpeg'
import reptile from '../../images/reptile.png'
import pets from '../../images/pets.png'
import placeholder from '../../images/placeholder.png'

class Home extends Component {
  constructor(props) {
    super(props);
    let cases = [];
    for (let i = 0; i < 3; i++) {
      cases.push({
        title: 'Case Title',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        show: false
      })
    }
    this.state = {
      cases
    }
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow(index) {
    const card = document.querySelector(`#card-${index}`);
    let items = [...this.state.cases];
    items[index].show = !items[index].show;
    this.setState({
      cases: items
    })
    if (items[index].show) {
      card.querySelector('.card-text').style.display = 'block';
      card.querySelector('button').classList.remove('card-show-arrow');
      card.querySelector('button').classList.add('card-hide-arrow');
    } else {
      card.querySelector('.card-text').style.display = '-webkit-box';
      card.querySelector('button').classList.remove('card-hide-arrow');
      card.querySelector('button').classList.add('card-show-arrow');
    }
  }

  render() {
    return (
      <div className="home">
        <Carousel variant='dark'>
          <Carousel.Item>
            <Container className="home-slide">
              <Row>
                <Col md={8}><img src={homePet} alt="home-pet" className="home-pet-img" /></Col>
                <Col md={4}><h1 className="home-pet-title">The Wild Vet Veterinary Clinic</h1></Col>
              </Row>
            </Container>
          </Carousel.Item>
          <Carousel.Item>
            <Container className="home-slide">
              <Row>
                <Col md={3}><div className="home-slide-desc-about">
                  <p>Lorem ipsum dolor sit amet</p>
                  <Link to="/about" className="btn btn-primary home-slide-link">Find More About Us</Link></div>
                </Col>
                <Col md={9}><img src={reptile} alt="home-pet" className="home-pet-img" /></Col>
              </Row>
            </Container>
          </Carousel.Item>
          <Carousel.Item>
            <Container className="home-slide">
              <Row>
                <Col md={10}><img src={pets} alt="home-pet" className="home-pet-img" /></Col>
                <Col md={2}>
                  <div className="home-slide-desc-check">
                    <p>Lorem ipsum dolor sit amet</p>
                    <Link to="pet-list" className="btn btn-primary home-slide-link">Check In</Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </Carousel.Item>
        </Carousel>

        <div className="home-cases">
          {this.state.cases.map((item, index) => {
            return (<Card key={index} style={{ width: '18rem' }} id={`card-${index}`}>
              <Card.Img variant='top' src={placeholder}></Card.Img>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  {item.desc}
                </Card.Text>
                <Button variant="primary" className="card-show-arrow" onClick={() => this.handleShow(index)}>{item.show ? 'hide' : 'show more'}</Button>
              </Card.Body>
            </Card>)
          })}
        </div>
      </div>

    )
  }
}

export default Home;
