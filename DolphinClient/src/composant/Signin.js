import React, { useState } from 'react';
import { useMutation } from 'react-query';
import {useAuth} from '../auth'
let Signin = () => {
    const [username, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const {signIn} = useAuth();

    let handleSubmit = (e) => {
        e.preventDefault();
        signIn({username,password})
    }
    return <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={e=> setUser(e.target.value)} required/> <br/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/> <br/>
            <button>Connexion</button>
        </form>
    </>
}
export default Signin;
