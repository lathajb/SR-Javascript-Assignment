'use-strict'

//const recastai = require('../../../node_modules/recastai');
let accessToken = 'Token f6cc35ac38757d0a9edf24108f85e63f';
const uri= 'https://api.recast.ai/v2/request?text=';

export default class RecastApiService{

    constructor(){
        console.log("Inside RecaseAPI Layer");
    }
    
     invokeCreateRepositoryApi(inputQuery){
         return fetch(uri + inputQuery , {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "Authorization": accessToken,
                    "Content-Type": "application/json; charset=utf-8",
                },
                //body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json()) // parses response to JSON
            .catch(error => console.error(`Fetch Error =\n`, error.message));

     }
}