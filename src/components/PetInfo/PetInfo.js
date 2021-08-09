import React, { Component } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

class PetInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pet: {...this.props.pet},
      petTypes: ['dog', 'cat', 'bird']
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  handleInputChange(event) {
    console.log(this.props)
    let pet = { ...this.state.pet };
    pet[event.target.name] = event.target.value;
    this.setState({ pet });
  }

  updateForm(pet) {
    this.setState({
      pet
    });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.actionType === 0 ? 'Add' : 'Update'} Pet Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control required name="name" value={this.state.pet.name} onChange={this.handleInputChange} placeholder="Pet Name" />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formType">
                <Form.Label>Type</Form.Label>
                <Form.Select required name="type" onChange={this.handleInputChange}>
                  {this.state.petTypes.map((type, index) => <option key={index} value={index}>{type}</option>)}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control required name="age" value={this.state.pet.age} onChange={this.handleInputChange} placeholder="Age" />
              </Form.Group>
            </Row>
            <Form.Group>
              <Form.Label>Pet Problem</Form.Label>
              <Form.Control as="textarea" name="problem" value={this.state.pet.problem} onChange={this.handleInputChange} placeholder="Describe your pet problems" style={{ height: '6rem' }}></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default PetInfo;
