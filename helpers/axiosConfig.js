import axios from 'axios';

const instnce=axios.create({
    baseURL:'https://20fe-2003-d1-9f4b-8100-a084-3fcc-ceac-518c.ngrok-free.app/api/'
});
export default instnce;