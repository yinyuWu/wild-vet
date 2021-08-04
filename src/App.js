import Home from './views/Home/Home'
import SignUp from './views/Admin/SignUp';
import VetNav from './components/vetNav/VetNav'
import { Route } from 'react-router-dom'
import SignIn from './views/Admin/SignIn';

function App() {
  return (
    <div>
      <VetNav />
      <div>
        <Route path="/" exact component={Home}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/signin" component={SignIn}/>
      </div>
    </div>
  );
}

export default App;
