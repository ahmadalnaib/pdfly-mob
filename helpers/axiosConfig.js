import axios from 'axios';

const instnce=axios.create({
    baseURL:'https://3036-2003-d1-9f3a-6a00-5928-9475-68bd-6078.ngrok-free.app/api/'
});
export default instnce;