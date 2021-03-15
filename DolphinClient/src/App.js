import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Menu from './Menu'
import {  } from 'react-router-dom';
import { Switch, Route, HashRouter} from "react-router-dom";
//composant pour le menu
import Signin from './composant/Signin';
import Signup from './composant/Signup'
const queryClient = new QueryClient()

let Main = () => {
  return <>
    <h1>Dolphin captor</h1>
    <Menu/>
    <hr/>
    <Switch>
		<Route path="/signin"> <Signin/> </Route>
    	<Route path="/signup"> <Signup/> </Route>
    </Switch>
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
