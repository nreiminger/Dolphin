import React from "react"
import {Link} from "react-router-dom";
import {useAuth} from "./auth"
import {Nav, Navbar} from "react-bootstrap";
export default () => {
    const {user, signOut} = useAuth();
    return <> 
            <Navbar bg="dark" variant="dark">
            {user == null
                ?
                <Nav ActiveKey="/#/home" variant="dark" bg="dark"  > 
                    <Nav.Item><Nav.Link href="/#/home">Home </Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/#/signin">Se connecter</Nav.Link></Nav.Item>
                </Nav>
                :
                <Nav>
                    <Nav.Item><Nav.Link href="/#/">Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/#/createGroupe">Créer un groupe</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/#/capteur">Les capteurs</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/#/changePassword">Modifier le mot de passe</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link onClick={signOut}>Deconnexion</Nav.Link></Nav.Item>
                </Nav>
                }
            </Navbar>
        </>
}