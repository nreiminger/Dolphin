import react,{useState} from "react"

let Signup = () =>{
    const [user, setUser] = useState(null);
    let handleSubmit = () =>{
        
    }
    return <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={user} onChange={e => setUser(e.target.value)}/><br/>
        </form>
    </>
}
export default Signup;