import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Menu from './Menu'
import { Switch, Route, HashRouter} from "react-router-dom";
//composant pour le menu
import Signin from './composant/Signin';
import Signup from './composant/Signup'
import {AuthProvider} from './auth';
import {Home} from './composant/Home'
import Capteur from './composant/Capteur'
import Groupe from './composant/Groupe'
import ChangePassword from './composant/ChangePassword'
import {Navbar} from "react-bootstrap";
const queryClient = new QueryClient()

let Welcome = () => {
  return <p>Bienvenue</p>
}
let Main = () => {
  return <>
    <AuthProvider>
    
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home" className="text-center">
      <img
        alt=""
        src="/logo.svg"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      Capteur Dolphin
    </Navbar.Brand>
  </Navbar>
      
      <Menu/>
      <hr/>
      <Switch>
        <Route path="/signin"> <Signin/> </Route>
        <Route path="/createAccount"> <Signup/> </Route>
        <Route path="/createGroupe"><Groupe/></Route>
        <Route path='/home'> <Welcome/></Route>
        <Route path="/capteur"><Capteur/></Route>
        <Route path="/changePassword"><ChangePassword/></Route>
        <Route path="/"><Home/></Route>
      </Switch>
    </AuthProvider>
  </>
}

function App() {
  return (
    <HashRouter>
    <QueryClientProvider client={queryClient}>
       <Main/>
     </QueryClientProvider>
    </HashRouter>
  );
}

export default App;
