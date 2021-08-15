import Home from './views/Home/Home'
import SignUp from './views/Admin/SignUp';
import VetNav from './components/VetNav/VetNav'
import { Route } from 'react-router-dom'
import SignIn from './views/Admin/SignIn';
import PetList from './views/Pet/PetList';
import About from './views/About/About';
import ConfirmCode from './views/Admin/ConfirmCode';
import Footer from './components/Footer/Footer';
import './App.css'

function App() {
  return (
    <div className="app">
      <VetNav />
      <div>
        <Route path="/" exact component={Home}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/confirm-code" component={ConfirmCode}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/pet-list" component={PetList}/>
        <Route path="/about" component={About}/>
      </div>
      <div className="app-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
