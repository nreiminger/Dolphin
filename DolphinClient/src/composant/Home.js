import {useAuth} from '../auth';
export const Home = () =>{
    const {user, signin} = useAuth();
    return <p>Hello {user} !</p>
}