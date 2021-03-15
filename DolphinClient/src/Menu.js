import React from "react"
import {Link} from "react-router-dom";

export default () => {
    return <ul>
                <li><Link to="/">Home </Link></li>
                <li><Link to="signin">Se connecter</Link></li>
                <li><Link to="signup">S'inscrire</Link></li>
            </ul>
}