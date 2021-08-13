import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import PetInfo from '../../components/PetInfo/PetInfo';
import { connect } from 'react-redux';
import './PetList.css'
import { API, graphqlOperation } from 'aws-amplify';
import { listPets } from '../../graphql/queries';
import { deletePet } from '../../graphql/mutations';

class PetList extends Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    // data
    const species = ['Canine', 'Feline', 'Reptile', 'Avian', 'Amphibian', 'Rabbit', 'Rodent', 'Ferret'];
    const petSex = ['Male Entire', 'Male Neutered', 'Female Entire', 'Female Spayed', 'Unknown'];
    let pets = [];

    this.state = {
      petList: pets,
      showPetInfo: false,
      // 0: Add Pet Info, 1: Update Pet Info
      actionType: 0,
      species,
      petSex
    };
    this.getPetList = this.getPetList.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCloseAddForm = this.handleCloseAddForm.bind(this);
    this.handleSavePets = this.handleSavePets.bind(this);
  }

  async componentDidMount() {
    await this.getPetList();
  }

  async getPetList() {
    try {
      const user = this.props.user;
      if (user && user.username) {
        const petData = await API.graphql(graphqlOperation(listPets));
        const petList = petData.data.listPets.items.filter(pet => pet.owner === user.username);
        // replace null with empty string
        for (let pet of petList) {
          for (let key of Object.keys(pet)) {
            if (pet[key] === null) pet[key] = "";
          }
        }
        console.log(petList);
        this.setState({ petList });
      }
    } catch (err) {
      console.log('error on fetching pets: ', err);
    }
  }

  handleAdd() {
    this.child.current.updateForm({
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
      owner: this.props.user.username
    });
    this.setState({
      actionType: 0,
      showPetInfo: true,
    });
  }

  handleCloseAddForm() {
    this.setState({ showPetInfo: false });
  }

  handleUpdate(pet) {
    this.child.current.updateForm(pet);
    this.setState({
      actionType: 1,
      showPetInfo: true
    });
  }

  async handleDelete(id) {
    // console.log(id);
    try {
      const petData = await API.graphql(graphqlOperation(deletePet, { input: { id } }));
      console.log(petData);
    } catch (err) {
      console.log('error: ', err);
    }
    await this.getPetList();
  }

  handleSavePets() {
    console.log("save pets")
  }

  render() {
    return (
      <div className="pet-list">
        {!this.props.isLogin ? <h1>You have to login to see your pet list</h1> :
          <div>
            <Button variant="outline-primary" className="pet-list-add-btn mb-3" onClick={this.handleAdd}>Add Pet</Button>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Species</th>
                  <th>Breed</th>
                  <th>Age</th>
                  <th>Sex</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.petList.map(pet => (
                  <tr key={pet.id}>
                    <td>{pet.name}</td>
                    <td>{this.state.species[pet.species]}</td>
                    <td>{pet.breed}</td>
                    <td>{pet.age}</td>
                    <td>{this.state.petSex[pet.sex]}</td>
                    <td className="pet-list-cell-action">
                      <Button size="sm" variant="danger" onClick={() => this.handleDelete(pet.id)} className="pet-list-remove-btn">Remove</Button>
                      <Button size="sm" variant="light" onClick={() => this.handleUpdate(pet)}>Update</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button size="lg" className="pet-list-save-btn" onClick={this.handleSavePets}>Save Pets</Button>
            <PetInfo ref={this.child} show={this.state.showPetInfo} onClose={this.handleCloseAddForm} actionType={this.state.actionType} pet={this.state.selectedPet} username={this.props.user.username} getPets={this.getPetList}/>
          </div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    user: state.user.user
  }
};

export default connect(mapStateToProps)(PetList);