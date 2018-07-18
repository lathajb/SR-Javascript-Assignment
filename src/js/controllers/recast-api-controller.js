'usestrict'

import RecastApiService from "../services/recast-api-service"

let recastService = new RecastApiService();

export default class RecastApiController{

        constructor(){
            console.log("Inside RecastApiController Layer");
        }

        invokeCreateRepositoryApi(inputQuery){
            console.log(recastService.invokeCreateRepositoryApi(inputQuery));
            return recastService.invokeCreateRepositoryApi(inputQuery);
        }

}