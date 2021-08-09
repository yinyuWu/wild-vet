import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import PetInfo from '../../components/PetInfo/PetInfo';
import './PetList.css'

class PetList extends Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    // data
    const petTypes = ['dog', 'cat', 'bird'];
    let pets = [];
    for (let i = 0; i < 7; i++) {
      pets.push({
        id: i,
        name: 'Mark',
        type: petTypes[1],
        age: 2,
        problem: 'Problem Text,Problem Text,Problem Text,Problem Text,Problem Text,Problem Text,ProbleProbleText, Problem Text,Problem Text,Problem Text,Problem Text'
      })
    }

    this.state = {
      petList: pets,
      showPetInfo: false,
      // 0: Add Pet Info, 1: Update Pet Info
      actionType: 0,
      petTypes,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleCloseAddForm = this.handleCloseAddForm.bind(this);
  }

  handleAdd() {
    this.child.current.updateForm({
      name: '',
      age: '',
      type: '',
      problem: ''
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

  render() {
    return (
      <div className="pet-list">
        <Button variant="outline-primary" className="pet-list-add-btn mb-3" onClick={this.handleAdd}>Add Pet</Button>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Age (year)</th>
              <th>Problem</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.petList.map(pet => (
              <tr key={pet.id}>
                <td>{pet.name}</td>
                <td>{pet.type}</td>
                <td>{pet.age}</td>
                <td className="pet-list-cell-problem">
                  <div>
                    {pet.problem}
                  </div>
                </td>
                <td className="pet-list-cell-action">
                  <Button size="sm" variant="danger" className="pet-list-remove-btn">Remove</Button>
                  <Button size="sm" variant="light" onClick={() => this.handleUpdate(pet)}>Update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PetInfo ref={this.child} show={this.state.showPetInfo} onClose={this.handleCloseAddForm} actionType={this.state.actionType}  pet={this.state.selectedPet}/>
      </div>
    )
  }
}

export default PetList;