import React, { useState } from 'react';
let Signin = () => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    let handleSubmit = () => {
        console.log(user + " "+password);
    }
    return <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={user} onChange={e=> setUser(e.target.value)} required/> <br/>
            <input type="password" value={password} onChange={e=> setPassword(e.traget.value)} required/><br/>
            <button>Connexion</button>
        </form>
    </>
}
export default Signin;
