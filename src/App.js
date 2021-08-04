import Home from './views/Home/Home'
import SignUp from './views/Admin/SignUp';
import VetNav from './components/vetNav/VetNav'
import { Route } from 'react-router-dom'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div>
      <VetNav />
      <div>
        <Route path="/" exact component={Home}/>
        <Route path="/signup" component={SignUp}/>
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
