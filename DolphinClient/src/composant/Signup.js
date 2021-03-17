import react,{useState} from "react"
import { useAuth } from "../auth";

let Signup = () =>{
    const [username, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const {signUp} = useAuth();
    let handleSubmit = (e) =>{
        e.preventDefault();
        signUp({username, password:"", isAdmin})
    }
    return <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={e => setUser(e.target.value)}/><br/>
            <label>Administrateur</label> <input type="checkbox" onChange={() => setIsAdmin(current => !current)}/>
            <button>Créer le compte</button>
        </form>
    </>
}
export default Signup;