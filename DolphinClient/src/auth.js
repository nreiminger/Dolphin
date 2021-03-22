import react,{useState, createContext, useContext, useEffect} from "react";
import { useHistory } from "react-router";
import {url_prefix, checkStatus} from './CheckStatus'
const AuthContext = createContext();

export let  AuthProvider = ({children})=> {
    const [user, setUser] = useState(null);
    const [isAdmin,setIsAdmin] = useState(false);
    const [checkingUser, setCheckingUser] = useState(false);
    const history = useHistory();

    useEffect(() => {
      whoami()
    }, []);

    const signIn = ({username,password}) => {
      fetch(`${url_prefix}/user/signin`, 
        {
          method:"POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({username ,password})
        })
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {localStorage.setItem("token",data); history.push('/')} )
        .then(whoami)
        .catch(err=> console.log(err))
    }
    const whoami = () =>{
      const token = window.localStorage.getItem('token');
      fetch(`${url_prefix}/user/whoami`,{
        method : "POST",
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      .then(checkStatus)
      .then(res => res.json())
      .then(data => setUser(
        {name: data.name, isAdmin: data.isAdmin}
      ))
      .catch(err => console.log(err))
    }

    let signUp = ({username, password}) => {
      console.log(username + password)
      fetch(`${url_prefix}/user/signup`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username , password})
      })
      .then(checkStatus)
      .then(history.push('/'))
      .catch(err => console.log(err))
    }

    let signOut = () => {
      setUser(null);
      localStorage.removeItem('token');
      history.push("/home")
    }
    return checkingUser 
            ? <p>Chargement ...</p>
            : <AuthContext.Provider value={{user, signIn, signUp, signOut}}>
                {children}
              </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
