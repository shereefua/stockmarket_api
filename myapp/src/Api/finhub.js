import axios from 'axios';
//configuring axios

const TOKEN= "coadqe9r01qg9u919klgcoadqe9r01qg9u919km0"//token is used only for authentication prpse bcoz of the terms & condition of finhubbapi

export default axios.create({
    baseURL:"https://finnhub.io/api/v1",
    params:{ 
        token:TOKEN
     }
})