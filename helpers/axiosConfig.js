import axios from 'axios';

const instnce=axios.create({
    baseURL:'https://f153-2003-d1-9f2c-dc00-c9af-5d39-9dac-799e.ngrok-free.app/api/'
});
export default instnce;