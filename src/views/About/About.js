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
            <div className="about-header"><i>OUR COMMITMENT</i></div>
          </Row>
          <div className="about-content">
            <h2 className="about-content-title">To You</h2>
            <p>
              The moment you enter our clinic, your pet will be treated as a member of our extended family.
            </p>
            <p>
              We endeavour to get to know you and your pets to the best of our ability, and their wellbeing is our number one priority. You can expect us to remember your pet’s birthday, when their vaccination and parasite prevention is due, how you like your coffee (or tea), and the names of your other family members. We understand that you lead a busy life, so we want you to know that we have your pet’s health needs covered.
            </p>
            <p>
              We offer a personalised experience which is not offered by many veterinary clinics, not a ‘one-size-fits-all’ approach. Owners are involved in every aspect of your pet’s diagnostic workup and treatment plan, and we will equip you with detailed handouts so that you have a thorough understanding of all aspects of your pet’s illness. Upon hospital discharge, all test results are discussed in detail; and each pet is sent home with a discharge letter explaining all treatments your pet received.
            </p>
            <p>
              We also offer wellness plans for clients wanting to ensure that their pet receives the highest standard of care (at a significantly discounted price!).
            </p>
            <hr />
            <h2 className="about-content-title">To Your Pets</h2>
            <p>
              You may notice that our consultation process is different to most veterinary clinics. We have restructured our hospital to mimic that of human hospitals,  streamlining the consultation process and allowing your pet to be seen with minimal waiting time.
            </p>
            <p>
              Our experienced nurses are trained to detect any serious illnesses, and to gain a thorough history of your pet. This will screen for emergencies, and ensure that the time spent with your chosen veterinarian is spent focusing  on the examination and diagnostics.
            </p>
            <p>
              We believe in creating a fear-free space for your pet, and we understand that veterinary visits are often a stressful time for your pet. In order to minimise stress, we have taken several measures to ensure your pet feels as comfortable as possible during their visit. These measures include separate dog/cat/exotics waiting areas and consultation rooms, an assortment of tasty treats to distract your pet during uncomfortable procedures, pheromone diffusers in each room, comfy bedding in hospital cages, and most importantly – lots of cuddles!
            </p>
            <hr />
            <h2 className="about-content-title">To The Environment</h2>
            <h3 className="about-content-subtitle">Paperless Practice</h3>
            <p>
              At The Wild Vet we are committed to minimising our environmental impact. Our clinic is almost entirely paperless, therefore all consent forms and receipts are completed digitally. If you would prefer a hard copy of any of your pet’s paperwork, we are happy to oblige – just ask one of our friendly staff!
            </p>
            <h3 className="about-content-subtitle">Soft Plastic Recycling Collection Point</h3>
            <p>
              Unfortunately pet food packaging can generate a significant amount of soft plastic waste, which cannot be recycled in household bins. Which is why we offer a recycling service for pet-food related soft plastics. Simply bring your empty food bags and as a token of our appreciation, we will give you a 5% discount off your next pet food purchase*
            </p>
            <p>
              *Discount applicable to same-day purchases
            </p>
            <h3 className="about-content-subtitle">Minimising Plastic Use</h3>
            <p>
              At The Wild Vet, we aim to minimise plastic use whenever possible. Medications are dispensed in environmentally-friendly packaging wherever possible, and our pet shop is stocked with products containing biodegradable packaging wherever possible
            </p>

          </div>

        </Container>
      </div>
    )
  }
}

export default About;