import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-react-64de4.firebaseio.com/'
});

export default instance;