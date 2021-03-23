import { useState } from "react";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";

let ChangePassword = () => {
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);
    const [message, setMessage] = useState(null);

    let handleSubmit = (e) => {
        e.preventDefault();
        if(password == passwordConfirm){

        }else{
            setMessage("Les mots de passe ne sont pas identiques")
        }
    }

    return <>
        <h2>Changer le mot de passe</h2>
        <Form onClick={handleSubmit}>
            <Row xs={2} md={4} lg={6}>
            <Col>
                <FormControl placeholder="Nouveau mdp" onChange={e=> setPassword(e.target.value)} required></FormControl>
            </Col>
            <Col>
                <FormControl placeholder="confirmer le mdp" onChange={e => setPasswordConfirm(e.target.value)} required></FormControl>
            </Col>
            </Row> <br/>
            <Button variant="primary" type="submit">Modifier</Button>
            {
                message &&
                    <p>{message}</p>
            }
        </Form>
    </>
}
export default ChangePassword;