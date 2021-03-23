import react,{useState} from "react";
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from 'react-query'
import api from '../apiCapteur';
import {Table , Button, Modal} from "react-bootstrap";
let Capteur = () => {

    const queryCache = useQueryClient();
    
    const{data: capteurs} = useQuery('capteur',  () => api.getCapteurs() );
    const{data : groups} = useQuery('group', () => api.getGroup() )
    
    console.log(groups);
    const [showSuppr, setShowSuppr] = useState(false);
    const [showModif, setShowModif] = useState(false);
    const [group_id , setGr ] = useState(1);

    const [currentCapteur, setCurrentCapteur] = useState(-1);
    const mutationDelete = useMutation(api.deleteCapteur, {
        onSuccess : () => {
            queryCache.invalidateQueries("capteur");
        }
    })
    
    const mutationModif = useMutation(api.updateCapteur,{
        onSuccess : () => {
            queryCache.invalidateQueries("capteur");
        }
    })

    const handleCloseSuppr = (success) => {
            setShowSuppr(false)
            if(success){
                mutationDelete.mutate(currentCapteur);
            }
        };
    const handleShowSuppr = (capteur_id) => {
        setShowSuppr(true)
        setCurrentCapteur(capteur_id)
    };

    const handleShowModif = (capteur_id) =>{
        setShowModif(true)
        setCurrentCapteur(capteur_id);
    }

    const handleCloseModif = (success) => {
        setShowModif(false)
        if(success){
            mutationModif.mutate({currentCapteur,group_id})
        }
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
                    <td>  
                        <Button variant="danger" onClick={() => handleShowSuppr(capteur.user.cap_id_capteur)}>Supprimer</Button>{' '}
                        <Button variant="warning" onClick={() => handleShowModif(capteur.user.cap_id_capteur)}>Modifier</Button>
                    </td>
                </tr>)
            }
        </tbody>
        </Table>
        <Modal show={showSuppr} onHide={handleCloseSuppr}>
        <Modal.Header closeButton>
          <Modal.Title>Suppression du capteur numéro {currentCapteur}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Etes-vous sûr de bien vouloir supprimer le capteur ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseSuppr(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={() => handleCloseSuppr(true)}>
            Supprimer
          </Button>
        </Modal.Footer>
        </Modal>

        <Modal show={showModif} onHide={handleShowModif}>
        <Modal.Header closeButton>
          <Modal.Title>Affectation du capteur numéro {currentCapteur}</Modal.Title>
        </Modal.Header>
        <Modal.Body> <label>Affecter au groupe </label> 
                    <select>
                        {groups?.map(group => <option onClick={ () => setGr(group.id) }>{group.nom}</option>)}
                    </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModif(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={() => handleCloseModif(true)}>
            Affecter
          </Button>
        </Modal.Footer>
        </Modal>
    </>
}
export default Capteur;