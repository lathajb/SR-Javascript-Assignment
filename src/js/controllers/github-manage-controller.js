'usestrict'

import GithubManageService from "../services/github-manage-service"

let gitservice = new GithubManageService();

export default class GitHubManageController{

        constructor(){
            console.log("Inside GitHubManageController Layer");
        }
    
        getAllIssuesForSpecificRepo(){
            return gitservice.getAllIssuesForSpecificRepo();
        }


        createRepository(queryName){
            return gitservice.createRepository(queryName);
        }

        createIssueForRepo(){
             return gitservice.createIssueForRepo();  
        }

        updateIssue(){
             return gitservice.updateIssue();  
        }

        createCollaborator(){
             return gitservice.createCollaborator();  
        }

}
