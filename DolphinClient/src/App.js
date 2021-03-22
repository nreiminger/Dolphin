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

const queryClient = new QueryClient()

let Welcome = () => {
  return <p>Bienvenue</p>
}
let Main = () => {
  return <>
    <AuthProvider>
      <h1>Dolphin captor</h1>
      <Menu/>
      <hr/>
      <Switch>
        <Route path="/signin"> <Signin/> </Route>
        <Route path="/createAccount"> <Signup/> </Route>
        <Route path="/createGroupe"><Groupe/></Route>
        <Route path='/home'> <Welcome/></Route>
        <Route path="/capteur"><Capteur/></Route>
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
