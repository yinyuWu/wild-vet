import React, { Component } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import Joi from 'joi-browser';
import './PetInfo.css'
import { API, graphqlOperation } from 'aws-amplify';
import { createPet, updatePet } from '../../graphql/mutations';

class PetInfo extends Component {

  constructor(props) {
    super(props);
    const species = ['Canine', 'Feline', 'Reptile', 'Avian', 'Amphibian', 'Rabbit', 'Rodent', 'Ferret'];
    const petSex = ['Male Entire', 'Male Neutered', 'Female Entire', 'Female Spayed', 'Unknown'];
    this.state = {
      pet: {
        id: '',
        name: '',
        species: 0,
        sex: 0,
        age: '',
        breed: '',
        color: '',
        weight: '',
        microchip: '',
        insurance: '',
        medications: '',
        parasiteControl: '',
        owner: this.props.username
      },
      schema: {
        id: Joi.string(),
        name: Joi.string().required().label("Name"),
        species: Joi.number(),
        sex: Joi.number(),
        age: Joi.string(),
        breed: Joi.string(),
        color: Joi.string(),
        weight: Joi.number(),
        microchip: Joi.string(),
        insurance: Joi.string(),
        medications: Joi.string(),
        parasiteControl: Joi.string(),
        owner: Joi.string()
      },
      errors: {},
      species,
      petSex,
      btnLoading: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.validate = this.validate.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  handleInputChange(event) {
    let errors = { ...this.state.errors };
    const errorMsg = this.validateField(event.target.name, event.target.value);
    if (errorMsg) {
      errors[event.target.name] = errorMsg;
    } else {
      delete errors[event.target.name];
    }

    let pet = { ...this.state.pet };
    pet[event.target.name] = event.target.value;
    this.setState({ pet, errors });
  }

  async handleSave() {
    this.setState({ btnLoading: true });
    const errors = this.validate();
    console.log(errors);
    if (errors) {
      this.setState({ btnLoading: false });
      return
    };

    let pet = { ...this.state.pet };
    if (this.props.actionType === 0) {
      // add pet
      console.log('add pet');
      pet.checkedIn = false;
      try {
        await API.graphql(graphqlOperation(createPet, { input: pet }));
      } catch (err) {
        console.log(err);
      }
    } else {
      // update pet
      console.log('update pet');
      pet.checkedIn = false;
      try {
        await API.graphql(graphqlOperation(updatePet, { input: pet }));
      } catch (err) {
        console.log(err);
      }
    }
    await this.props.getPets();
    this.setState({ btnLoading: false });
    this.props.onClose();
  }

  updateForm(pet) {
    let petInfo = { ...pet }
    if (petInfo.createPet || petInfo.updatedAt || petInfo.checkedIn) {
      delete petInfo.createdAt;
      delete petInfo.updatedAt;
      delete petInfo.checkedIn;
    }

    this.setState({
      pet: petInfo,
      errors: {}
    });
  }

  validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.pet, this.state.schema, options);
    if (!error) return null;

    const errors = {};
    error.details.map(e => errors[e.path[0]] = e.message);
    this.setState({ errors });
    return errors;
  }

  validateField(name, value) {
    const fieldValue = { [name]: value };
    const schema = { [name]: this.state.schema[name] };
    const { error } = Joi.validate(fieldValue, schema);
    if (!error) return null;
    return error.details[0].message;
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.actionType === 0 ? 'Add' : 'Update'} Pet Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="pet-form">

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control className={this.state.errors.name && "pet-form-input-error"} required name="name" value={this.state.pet.name} onChange={this.handleInputChange} placeholder="Pet Name" />
              {this.state.errors.name && <div className="pet-form-error">{this.state.errors.name}</div>}
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formType">
                <Form.Label>Species</Form.Label>
                <Form.Select required name="species" onChange={this.handleInputChange} value={this.state.pet.species}>
                  {this.state.species.map((type, index) => <option key={index} value={index}>{type}</option>)}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formSex">
                <Form.Label>Sex</Form.Label>
                <Form.Select required name="sex" onChange={this.handleInputChange} value={this.state.pet.sex}>
                  {this.state.petSex.map((type, index) => <option key={index} value={index}>{type}</option>)}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control className={this.state.errors.age && "pet-form-input-error"} required name="age" value={this.state.pet.age} onChange={this.handleInputChange} placeholder="Age" />
                {this.state.errors.age && <div className="pet-form-error">{this.state.errors.age}</div>}
              </Form.Group>
              <Form.Group as={Col} controlId="formBreed">
                <Form.Label>Breed</Form.Label>
                <Form.Control className={this.state.errors.breed && "pet-form-input-error"} required name="breed" value={this.state.pet.breed} onChange={this.handleInputChange} placeholder="Breed" />
                {this.state.errors.breed && <div className="pet-form-error">{this.state.errors.breed}</div>}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formColor">
                <Form.Label>Color</Form.Label>
                <Form.Control className={this.state.errors.color && "pet-form-input-error"} required name="color" value={this.state.pet.color} onChange={this.handleInputChange} placeholder="Color" />
                {this.state.errors.color && <div className="pet-form-error">{this.state.errors.color}</div>}
              </Form.Group>
              <Form.Group as={Col} controlId="formWeight">
                <Form.Label>Weight</Form.Label>
                <Form.Control className={this.state.errors.weight && "pet-form-input-error"} required name="weight" value={this.state.pet.weight} onChange={this.handleInputChange} placeholder="Weight" />
                {this.state.errors.weight && <div className="pet-form-error">{this.state.errors.weight}</div>}
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formMicrochip">
              <Form.Label>Microchip</Form.Label>
              <Form.Control className={this.state.errors.microchip && "pet-form-input-error"} required name="microchip" value={this.state.pet.microchip} onChange={this.handleInputChange} placeholder="Microchip" />
              {this.state.errors.microchip && <div className="pet-form-error">{this.state.errors.microchip}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formInsurance">
              <Form.Label>Insurance</Form.Label>
              <Form.Control className={this.state.errors.insurance && "pet-form-input-error"} required name="insurance" value={this.state.pet.insurance} onChange={this.handleInputChange} placeholder="Insurance" />
              {this.state.errors.insurance && <div className="pet-form-error">{this.state.errors.insurance}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMedication">
              <Form.Label>Medication</Form.Label>
              <Form.Control className={this.state.errors.medications && "pet-form-input-error"} required name="medications" value={this.state.pet.medications} onChange={this.handleInputChange} placeholder="Medication" />
              {this.state.errors.medications && <div className="pet-form-error">{this.state.errors.medications}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formParasite">
              <Form.Label>Parasite Control</Form.Label>
              <Form.Control className={this.state.errors.parasiteControl && "pet-form-input-error"} required name="parasiteControl" value={this.state.pet.parasiteControl} onChange={this.handleInputChange} placeholder="Parasite Control" />
              {this.state.errors.parasiteControl && <div className="pet-form-error">{this.state.errors.parasiteControl}</div>}
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={this.state.btnLoading} variant="secondary" onClick={this.props.onClose}>
            Close
          </Button>
          <Button disabled={this.state.btnLoading} variant="primary" onClick={this.handleSave}>
            {this.state.btnLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default PetInfo;
