import React, { Component } from 'react'
import { Table, Button, Form, Spinner, Pagination, OverlayTrigger, Tooltip } from 'react-bootstrap'
import PetInfo from '../../components/PetInfo/PetInfo';
import AlertModal from '../../components/Alert/AlertModal';
import { connect } from 'react-redux';
import './PetList.css'
import { API, graphqlOperation } from 'aws-amplify';
import { updatePet } from '../../graphql/mutations';
import { listPets } from '../../graphql/queries';
import { deletePet } from '../../graphql/mutations';
import { jsPDF } from "jspdf";
import Auth from '@aws-amplify/auth';
import axios from 'axios';
import AuthService from '../Admin/AuthService';

class PetList extends Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    // data
    const species = ['Canine', 'Feline', 'Reptile', 'Avian', 'Amphibian', 'Rabbit', 'Rodent', 'Ferret'];
    const petSex = ['Male Entire', 'Male Neutered', 'Female Entire', 'Female Spayed', 'Unknown'];
    let checkInList = [];
    let checkStates = [];
    let pets = [];

    this.state = {
      petList: pets,
      showPetInfo: false,
      showAlert: false,
      // 0: Add Pet Info, 1: Update Pet Info
      actionType: 0,
      species,
      petSex,
      checkInList,
      checkStates,
      alertType: '',
      alertInfo: '',
      btnLoading: false,
      listLoading: true,
      currentPage: 0,
      totalPages: 0,
      pageSize: 8,
      pages: [],
      pageItems: []
    };
    this.getPetList = this.getPetList.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCloseAddForm = this.handleCloseAddForm.bind(this);
    this.handleSavePets = this.handleSavePets.bind(this);
    this.handleAddCheckIn = this.handleAddCheckIn.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
  }

  async componentDidMount() {
    await this.getPetList();
  }

  async getPetList() {
    try {
      // fetch data
      const user = AuthService.getUserName();
      if (user) {
        const petData = await API.graphql(graphqlOperation(listPets, {
          filter: {
            owner: {
              eq: user
            }
          },
          sortDirection: 'DESC',
        }));
        const petList = petData.data.listPets.items;

        // build pages
        const totalPages = petList.length / this.state.pageSize;
        let states = new Array(petList.length).fill(false);
        let pages = [];
        for (let i = 0; i < totalPages; i++) {
          pages.push(<Pagination.Item key={i + 1} active={this.state.currentPage === i} onClick={() => this.changePage(i)}>{i + 1}</Pagination.Item>)
        }
        for (let index in petList) {
          states[index] = petList[index].checkedIn
        }
        this.setState({
          pages,
          petList,
          checkStates: states,
          listLoading: false,
          totalPages,
          pageItems: petList.slice(this.state.currentPage * this.state.pageSize, (this.state.currentPage + 1) * this.state.pageSize)
        });
      }
    } catch (err) {
      console.log('error on fetching pets: ', err);
    }
  }

  changePage(page) {
    const { petList, totalPages } = this.state;
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(<Pagination.Item key={i + 1} active={page === i} onClick={() => this.changePage(i)}>{i + 1}</Pagination.Item>)
    }
    this.setState({
      currentPage: page,
      pages,
      pageItems: petList.slice(page * this.state.pageSize, (page + 1) * this.state.pageSize)
    });
  }

  handleCloseAlert() {
    this.setState({ showAlert: false })
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
      owner: AuthService.getUserName()
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
    document.getElementById(id).disabled = true;
    document.getElementById(id).innerText = 'Deleting...';
    try {
      await API.graphql(graphqlOperation(deletePet, { input: { id } }));
    } catch (err) {
      document.getElementById(id).disabled = false;
      document.getElementById(id).innerText = 'Remove';
      console.log('error: ', err);
    }
    await this.getPetList();
  }

  handleAddCheckIn(index, pet) {
    let states = [...this.state.checkStates];
    let checkin = [...this.state.checkInList];
    states[index] = !states[index];
    if (states[index]) checkin.push(this.state.petList[index]);
    else checkin.splice(checkin.indexOf(pet), 1);

    this.setState({
      checkInList: checkin,
      checkStates: states
    })
  }

  async handleSavePets() {
    this.setState({ btnLoading: true });
    if (this.state.checkInList.length === 0) {
      this.setState({ showAlert: true, alertType: 'danger', alertInfo: 'You must select at least one pet to check in!', btnLoading: false });
      return;
    }

    // update check in status of pets
    for (let pet of this.state.checkInList) {
      pet.checkedIn = true;
      delete pet.createdAt;
      delete pet.updatedAt;
      try {
        await API.graphql(graphqlOperation(updatePet, { input: pet }));
      } catch (err) {
        console.log(err);
        this.setState({ showAlert: true, alertType: 'danger', alertInfo: 'Server Error', btnLoading: false });
        return;
      }
    }

    // store user and pet info
    const saveUserFileApi = 'https://427fv2fo2c.execute-api.us-east-2.amazonaws.com/live/uploaduser';
    const sendEmailApi = 'https://427fv2fo2c.execute-api.us-east-2.amazonaws.com/live/wildvetsendemail';

    const doc = new jsPDF();
    const user = await Auth.currentAuthenticatedUser();
    const { address, email, phone_number } = user.attributes;
    doc.text(AuthService.getUserName(), 10, 10);
    doc.text(`email: ${email}\naddress: ${address}\nphone: ${phone_number}`, 10, 20);
    doc.text('##############\n', 10, 50);
    for (let i = 0; i < this.state.checkInList.length; i++) {
      const pet = this.state.checkInList[i];
      doc.text(`name: ${pet.name}, age: ${pet.age}, sex: ${this.state.petSex[pet.sex]}\nspecies: ${this.state.species[pet.species]}, breed: ${pet.breed}, color: ${pet.color}, weight: ${pet.weight}\nmedications: ${pet.medications}\ninsurance: ${pet.insurance}\nmicrochip: ${pet.microchip}\nparasite control: ${pet.parasiteControl}`, 10, 70 + i * 60);
    }
    let currentdate = new Date();
    let datetime = currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds() + ","
      + currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear();
    doc.text(datetime, 150, 70 + this.state.checkInList.length * 60);
    const pdfFile = doc.output('datauristring');
    const content = pdfFile.replace(/^data:application\/pdf;filename=generated.pdf;base64,/, "");

    // store pdf in s3 bucket
    axios.post(saveUserFileApi, {
      username: AuthService.getUserName(),
      content
    }).then(res => {
      let result = res.data;
      console.log(result);
      // send email
      axios.post(sendEmailApi, {
        username: AuthService.getUserName()
      }).then(res => {
        let result = res.data;
        console.log(result);
        this.setState({ showAlert: true, alertType: 'success', alertInfo: 'Check In Successfully', btnLoading: false, checkInList: [] });
      })
    })
  }

  render() {
    return (
      <div className="pet-list">
        {!AuthService.isUserLoggedIn() ? <h1 className="pet-list-none">Please sign in to see your pet list</h1> :
          <div className="pet-list-container">
            {this.state.listLoading ? <Spinner animation="border" /> :
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
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.pageItems.map((pet, index) => (
                      <tr key={pet.id} className={this.state.checkStates[index] ? 'pet-active' : ''}>
                        <td>{pet.name}</td>
                        <td>{this.state.species[pet.species]}</td>
                        <td>{pet.breed}</td>
                        <td>{pet.age}</td>
                        <td>{this.state.petSex[pet.sex]}</td>
                        <td className="pet-list-cell-action">
                          <Button id={pet.id} size="sm" variant="danger" onClick={() => this.handleDelete(pet.id)} className="pet-list-remove-btn">Remove</Button>
                          <Button size="sm" className="pet-list-update-btn" onClick={() => this.handleUpdate(pet)}>Update</Button>
                        </td>
                        
                        {pet.checkedIn ? <OverlayTrigger key={index} placement='top' overlay={
                          <Tooltip id={`tooltip-${this.state.currentPage * this.state.pageSize + index}`}>You Must Update Your Pet Info Before Checking In Again!</Tooltip>
                        }>
                          <td><Form.Check type="checkbox" id={`checkbox-${this.state.currentPage * this.state.pageSize + index}`} checked={this.state.checkStates[this.state.currentPage * this.state.pageSize + index]} disabled={pet.checkedIn} onChange={() => this.handleAddCheckIn(this.state.currentPage * this.state.pageSize + index, pet)} /></td>
                        </OverlayTrigger> : 
                        <td><Form.Check type="checkbox" id={`checkbox-${this.state.currentPage * this.state.pageSize + index}`} checked={this.state.checkStates[this.state.currentPage * this.state.pageSize + index]} disabled={pet.checkedIn} onChange={() => this.handleAddCheckIn(this.state.currentPage * this.state.pageSize + index, pet)} /></td>}

                      </tr>
                    ))}
                  </tbody>
                </Table>
                {this.state.totalPages > 1 && <Pagination>{this.state.pages}</Pagination>}
                <Button size="lg" className="pet-list-save-btn" disabled={this.state.btnLoading} onClick={this.handleSavePets}>{this.state.btnLoading ? 'In Progress...' : 'Check In'}</Button>
                <PetInfo ref={this.child} show={this.state.showPetInfo} onClose={this.handleCloseAddForm} actionType={this.state.actionType} pet={this.state.selectedPet} username={AuthService.getUserName()} getPets={this.getPetList} />
              </div>}
            <AlertModal show={this.state.showAlert} onClose={this.handleCloseAlert} type={this.state.alertType} info={this.state.alertInfo} />
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