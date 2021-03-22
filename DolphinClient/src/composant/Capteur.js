import react,{useState} from "react";
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from 'react-query'
import api from '../apiCapteur';
import {Table , Button, Modal} from "react-bootstrap";
let Capteur = () => {
    const{isLoading, data: capteurs} = useQuery('capteur', () => api.getCapteurs() );
    const queryCache = useQueryClient();
    const [show, setShow] = useState(false);
    const [currentCapteur, setCurrentCapteur] = useState(-1);
    const mutatationDelete = useMutation(api.deleteCapteur, {
        onSuccess : () => {
            queryCache.invalidateQueries("capteur");
        }
    })
    const handleClose = (success) => {
            setShow(false)
            if(success){
                mutatationDelete.mutate(currentCapteur);
            }
        };
    const handleShow = (capteur_id) => {
        setShow(true)
        setCurrentCapteur(capteur_id)
    };
    console.log(capteurs)
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
                    <td>  <Button variant="danger" onClick={() => handleShow(capteur.user.cap_id_capteur)} >Supprimer</Button>{' '}</td>
                </tr>)
            }
        </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Suppression du capteur numéro {currentCapteur}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Etes-vous sûr de bien vouloir supprimer le capteur ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={() => handleClose(true)}>
            Supprimer
          </Button>
        </Modal.Footer>
        </Modal>
    </>
}
export default Capteur;