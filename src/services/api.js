import axios from "axios";

const api = axios.create({
    baseURL: "https://api-pokemon-teste-mandarin.herokuapp.com",
})

export default api;