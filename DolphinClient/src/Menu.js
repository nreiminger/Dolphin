import React from "react"
import {Link} from "react-router-dom";
import {useAuth} from "./auth"
export default () => {
    const {user} = useAuth();
    console.log(user != null)
    return <> 
            {user == null
                ? <ul>
                    <li><Link to="/home">Home </Link></li>
                    <li><Link to="signin">Se connecter</Link></li>
                </ul>
                :
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/createAccount">Créer un compte utilisateur</Link></li>
                    <li><Link to="/capteur">Les capteur</Link></li>
                    <li><Link to="/signout">Deconnexion</Link></li>
                </ul>
                }
        </>
}