'usestrict'

let url = 'https://api.github.com/';
let accessToken = 'Bearer 4fc6792073144930c884993b57ac5e9a24350f64';

export default class GithubManageService{

    constructor(){
       console.log("Inside  GithubManageService layer");
       const headers = { Authorization : accessToken};
       
    } 


    /**************************Fetch issues for specific repo starts here*********************************/
   // Fetch all issues from all repositories
   getAllIssuesForSpecificRepo(user,repoName) {
           
            return fetch(url + "repos/"+user+"/"+repoName+"/issues", {
                method: "GET",
                mode: "cors",
                credentials: "same-origin", 
                headers: {
                    "Authorization": accessToken,
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(response => response.json()) 
            .catch(error => console.error(`Fetch Error =\n`, error));
    }


    getAllIssues(user){
            return fetch(url + "issues", {
                method: "GET", 
                mode: "cors", 
                credentials: "same-origin", 
                headers: {
                    "Authorization": accessToken,
                    "Content-Type": "application/json; charset=utf-8",
                },
                
            })
            .then(response => response.json()) 
            .catch(error => console.error(`Fetch Error =\n`, error));
    }

     /**************************Create repository starts here*********************************/
    // create a repository for a particular user using JQuery
    createRepository(queryName) {
        return new Promise (function(resolve, reject) {

                let passData = JSON.stringify({
                    "name": queryName,
                    "description": "This is your first repository",
                    "homepage": "https://github.com",
                    "private": false,
                    "has_issues": true,
                    "has_projects": true,
                    "has_wiki": true
                });


            jQuery.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: url + "user/repos",
                method: "POST",
                data: passData,
                dataType: "json",
                mode: "cors",
                beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', accessToken); }
            }).done(function (res) {
                 resolve(res);
            }).fail(function (jqXHR, textStatus) {
                reject(textStatus)
                console.log("Request failed: " + textStatus);
            })

        })
            
     }
     /**************************Create repository ends here*********************************/

      createIssueForRepo(issueObj){
        
            var data = { 
               "title": issueObj.issueName,
               "body": issueObj.issueDesc,
               "assignees": ["lathajb" ],
               "labels": ["bug"] 
            };
            return fetch(url + "repos/"+issueObj.user+"/"+issueObj.repoName+"/issues", {
                method: "POST", 
                mode: "cors", 
                credentials: "same-origin", 
                headers: {
                    "Authorization": accessToken,
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .catch(error => console.error(`Fetch Error =\n`, error));
     }


     createTempIssueForRepo(){
          
           var resp = null;
           var data = { 
               "title": "Found a bug",
               "body": "I'm having a problem with this.",
               "assignees": ["lathajb" ],
               "labels": ["bug"] 
            };

            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log("from service "+this.responseText);
                    resp = this.responseText;
                }
            });

            xhr.open("POST", url + "repos/lathajb/JavaScript-Test-Repo/issues");
            //xhr.setRequestHeader("Cache-Control", "no-cache");
            //xhr.setRequestHeader("Postman-Token", "d0644c4f-fd44-4369-8ea9-d7984e4ae17b");
            xhr.setRequestHeader("Authorization", accessToken);
            //xhr.setRequestHeader("Access-Control-Allow-Origin","https://api.github.com");
            xhr.send(JSON.stringify(data));

          return resp;
     }

   /**************************Fetch issues for specific repo starts here*********************************/
   updateIssue(updateReqObject) {

            var data ={
                
                    "title": updateReqObject.issueName,
                    "body": updateReqObject.issueDesc,
                    "assignees": [
                        "lathajb"
                    ],
                    
                    "state": updateReqObject.issueStatus,
                    "labels": [
                        "bug"
                    ]
              }
        
            return fetch(url + "repos/"+updateReqObject.user+"/"+updateReqObject.repo+"/issues/"+updateReqObject.id, {
                method: "PATCH", 
                mode: "cors", 
                credentials: "same-origin", 
                headers: {
                    "Authorization": accessToken,
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(data), 
            })
            .then(response => response.json()) 
            .catch(error => console.error(`Fetch Error =\n`, error));
    }


    /**************************create collaborators starts here*********************************/
   createCollaborator(collaboratorReqObj) {

            var data ={};
        
            return fetch(url + "repos/"+collaboratorReqObj.user+"/"+collaboratorReqObj.repoName+"/collaborators/"+collaboratorReqObj.collaborator, {
                method: "PUT", 
                mode: "cors", 
                credentials: "same-origin", 
                headers: {
                    "Authorization": accessToken,
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .catch(error => console.error(`Fetch Error =\n`, error));
    }
}



//export{getAllIssues,getIssuesForRepo,createRepo}
