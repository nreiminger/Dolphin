import { useState } from "react";
import { FormControl, Form,Row, Col, Button} from  "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router";
import api from '../apiCapteur';

let Groupe = () => {
    const history = useHistory();
    const [name, setName] = useState(null);
    const [nbCapteur, setNbCatepteur] = useState(1);
    const queryCache = useQueryClient();
    const mutation = useMutation(api.createGroupe,{
        onSuccess:() =>{
            queryCache.invalidateQueries("capteur")
            history.push('/')
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({name, nbCapteur})        
    }

    return(
        <>
            <h2>Créer un groupe</h2>
            <Form onSubmit ={handleSubmit}>
                <Row xs={2} md={4} lg={6}>
                    <Col>
                        <FormControl placeholder="Nom du groupe" onChange={e=> setName(e.target.value)} required></FormControl>
                    </Col>
                    <Col>
                        <FormControl placeholder="Nombre de capteur" type="number" min={1} onChange={e => setNbCatepteur(e.target.value)} required></FormControl>
                    </Col>
                </Row> <br/>
                <Button variant="primary" type="submit">Créer</Button>
            </Form>
        </>
    )
}
export default Groupe;