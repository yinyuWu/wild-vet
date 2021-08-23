import Home from './views/Home/Home';
import SignUp from './views/Admin/SignUp';
import VetNav from './components/VetNav/VetNav';
import { Route, Switch } from 'react-router-dom';
import AuthRoute from './views/Admin/AuthRoute';
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
        <Switch>
          <AuthRoute path="/" exact component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/confirm-code" component={ConfirmCode} />
          <Route path="/signin" component={SignIn} />
          <AuthRoute path="/pet-list" component={PetList} />
          <AuthRoute path="/about" component={About} />
        </Switch>
      </div>
      <div className="app-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
