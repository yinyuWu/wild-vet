import React, { Component } from 'react'
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'
import homePet from '../../images/home-pet.jpeg'
import reptile from '../../images/reptile.png'
import pets from '../../images/pets.png'

class Home extends Component {
  constructor(props) {
    super(props);
    let cases = [];
    const imgsURL = [
      'https://i1.wp.com/thewildvet.com.au/wp-content/uploads/2020/12/psturtle.jpg?w=1300',
      'https://i0.wp.com/thewildvet.com.au/wp-content/uploads/2020/12/znwshugo.jpg?w=1300',
      'https://i2.wp.com/thewildvet.com.au/wp-content/uploads/2020/12/sbc.jpg?w=1300',
    ];
    const titles = [
      'Rescuing, rehabilitating, & releasing turtles in Port Stephens',
      'Operating on the resident red-necked Wallaby ‘Hugo’',
      'Transporting 50 juvenile bats for release'
    ];
    const subtitles = [
      'with Sea Shelter',
      'with Zambi Native Wildlife Sanctuary',
      'with Shoalhaven Bat Clinic & Sanctuary'
    ];
    const body = [
      '“[Emma] had approached us previously after visiting our facility, offering her assistance. Residing in Sydney, she showed dedication driving up here with her team to assess Ally,”',
      '“Thank you so much to Dr Emma Hall and her team from The Wild Vet Clinic for operating on our resident Red-necked Wallaby, Hugo today… “',
      '“…Emma Hall, a Veterinarian, from The Wild Vet clinic, regularly attends to flying-fox injuries…”'
    ];
    const links = [
      'https://www.newcastleherald.com.au/story/6992673/rescuing-rehabilitating-and-releasing-turtles-in-port-stephens/',
      'https://m.facebook.com/permalink.php?id=550936358295158&story_fbid=3225648750823892',
      'https://www.flyingfoxsupporters.com.au/news/rescue-of-a-3-month-juvenile-flying-fox-in-redfern-sydney-valuable-contribution-by-police-officers-veterinarian?fbclid=IwAR2kd83HPNwNsWP__HZv_1XNB3WIoqQ8sRaznDBjrpiFLJ5cXJ10BK_Rx_U'
    ]
    for (let i = 0; i < 3; i++) {
      cases.push({
        title: titles[i],
        subtitle: subtitles[i],
        desc: body[i],
        img: imgsURL[i],
        link: links[i],
        show: false
      })
    }
    this.state = {
      cases
    }
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow(index) {

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
        <br />
        <h2 className="home-title">THE WILD VET CONSERVATION FUND</h2>
        <div className="home-cases">
          {this.state.cases.map((item, index) => {
            return (<Card key={index} style={{ width: '18rem' }} id={`card-${index}`}>
              <Card.Img variant='top' src={item.img} width="286" height="250"></Card.Img>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.subtitle}</Card.Subtitle>
                <Card.Text>
                  {item.desc}
                </Card.Text>
                <Card.Link href={item.link} target="_blank" className="btn btn-secondary card-link">Read More</Card.Link>
              </Card.Body>
            </Card>)
          })}
        </div>
        <h2 className="home-title">ABOUT</h2>
        <div className="home-text">
          Here at The Wild Vet your pets are part of our family. You will be looked after by our qualified veterinary and nursing team who have extensive experience with all species – come and meet the team. In addition to dogs and cats, we have a special focus on birds, rabbits, reptiles, rodents, and other pocket pets (see the species we treat). At the Wild Vet we work with state of the art diagnostic, laboratory, surgical and clinical settings to provide the highest standard of care for your pet. Whenever possible your pet will see their regular vet that knows them best, and our priority is to have frequent and open communication while your pet is with us.
        </div>
      </div>

    )
  }
}

export default Home;
