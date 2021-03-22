import react,{useState} from "react";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import api from '../apiCapteur';
import {Table , Button, Modal} from "react-bootstrap";
let Capteur = () => {
    const{isLoading, data: capteurs} = useQuery('capteur', () => api.getCapteurs() );
    const [show, setShow] = useState(false);
    const handleClose = () => {
            setShow(false)
        };
    const handleShow = () => setShow(true);
        return <>
        <h2>Les capteurs</h2>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Groupe</th>
                    <th>Nom</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                capteurs?.map(capteur => <tr>
                    <td>{capteur.gro_nom}</td>
                    <td>{capteur.user.uti_name}</td>
                    <td>  <Button variant="danger" onClick={handleShow} >Supprimer</Button>{' '}</td>
                </tr>)
            }
        </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Suppression d'un capteur</Modal.Title>
        </Modal.Header>
        <Modal.Body>Etes-vous sûr de bien vouloir supprimer le capteur ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Supprimer
          </Button>
        </Modal.Footer>
        </Modal>
    </>
}
export default Capteur;