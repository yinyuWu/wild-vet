import Home from './views/Home/Home'
import SignUp from './views/Admin/SignUp';
import VetNav from './components/VetNav/VetNav'
import { Route } from 'react-router-dom'
import SignIn from './views/Admin/SignIn';
import PetList from './views/Pet/PetList';
import About from './views/About/About';

function App() {
  return (
    <div>
      <VetNav />
      <div>
        <Route path="/" exact component={Home}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/pet-list" component={PetList}/>
        <Route path="/about" component={About}/>
      </div>
    </div>
  );
}

export default App;
