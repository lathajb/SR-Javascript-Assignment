'usestrict'

import GithubManageService from "../services/github-manage-service"

let gitservice = new GithubManageService();

export default class GitHubManageController{

        constructor(){
            console.log("Inside GitHubManageController Layer");
        }
    
        getAllIssuesForSpecificRepo(user,repoName){
            return gitservice.getAllIssuesForSpecificRepo(user,repoName);
        }

        getAllIssues(){
            return gitservice.getAllIssues(user);
        }


        createRepository(queryName){
            return gitservice.createRepository(queryName);
        }

        createIssueForRepo(issueObj){
             return gitservice.createIssueForRepo(issueObj);  
        }

        updateIssue(updateReqObject){
             return gitservice.updateIssue(updateReqObject);  
        }

        createCollaborator(collaboratorReqObj){
             return gitservice.createCollaborator(collaboratorReqObj);  
        }

}
