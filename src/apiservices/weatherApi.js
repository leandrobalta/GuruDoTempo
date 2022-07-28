import axios from "axios";

const api = axios.create({
    baseURL: 'http://api.weatherapi.com/v1/current.json?key=0e85dde810194306900185221221407&q='
});

export default api