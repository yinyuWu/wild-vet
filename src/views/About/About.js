import React, { Component } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import avator from '../../images/user-avator.png'
import './About.css'
class About extends Component {
  constructor(props) {
    super(props);
    let staff = [];
    for (let i = 0; i < 5; i++) {
      staff.push({
        name: 'Staff Wsss',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      })
    }
    this.state = {
      staff
    }
  }

  render() {
    return (
      <div className="about">
        <Container>
          <Row>
            <h1 className="about-title">About Us</h1>
          </Row>
          <Row>
            <div className="about-header"><i>Our Staff</i></div>
          </Row>
          {this.state.staff.map((staff, index) => {
            return (<div key={index} className="about-item">
              <Row>
                <Col sm={12} md={2}>
                  <h3 className="about-item-name">{staff.name}</h3>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={2}>
                  <Image width={100} height={100} src={avator} className="about-item-img" roundedCircle></Image>
                </Col>
                <Col sm={12} md={10}>
                  <p>{staff.desc}</p>
                </Col>
              </Row>
              <hr />
            </div>)
          })}

          <Row>
            <div className="about-header"><i>Wild Pet</i></div>
          </Row>
          <div className="about-content">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. <br /><br />
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. <br /><br />
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
          </div>

        </Container>
      </div>
    )
  }
}

export default About;