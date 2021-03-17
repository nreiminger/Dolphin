import {useAuth} from '../auth';
export const Home = () =>{
    const {user, signin} = useAuth();
    return <p>hello {user?.name}</p>
}