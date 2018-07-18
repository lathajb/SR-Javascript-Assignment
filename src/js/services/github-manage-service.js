'usestrict'

let url = 'https://api.github.com/';
let accessToken = '322c1ef9d262d07d60eefe8dc14ba8353f2f58f6';

export default class GithubManageService{

    constructor(){
       console.log("Inside  GithubManageService layer");
       const headers = { Authorization : 'Bearer 322c1ef9d262d07d60eefe8dc14ba8353f2f58f6'};
       
    } 


    /**************************Fetch issues for specific repo starts here*********************************/
   // Fetch all issues from all repositories
   getAllIssuesForSpecificRepo() {
        
            return fetch(url + 'issues', {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "Authorization": "Bearer 322c1ef9d262d07d60eefe8dc14ba8353f2f58f6",
                    "Content-Type": "application/json; charset=utf-8",
                },
                //body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json()) // parses response to JSON
            .catch(error => console.error(`Fetch Error =\n`, error));
    }

     /**************************Create repository starts here*********************************/
    // create a repository for a particular user using JQuery
    createRepository() {
        return new Promise (function(resolve, reject) {

                let passData = JSON.stringify({
                    "name": "JavaScript-Test-Repo18",
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
                beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'BEARER ' + accessToken); }
            }).done(function (res) {
                 resolve(res);
            }).fail(function (jqXHR, textStatus) {
                reject(textStatus)
                console.log("Request failed: " + textStatus);
            })

        })
            
     }
     /**************************Create repository ends here*********************************/
     createIssueForRepo(){
          
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
            xhr.setRequestHeader("Authorization", "token 322c1ef9d262d07d60eefe8dc14ba8353f2f58f6");
            //xhr.setRequestHeader("Access-Control-Allow-Origin","https://api.github.com");
            xhr.send(JSON.stringify(data));

          return resp;
     }

   /**************************Fetch issues for specific repo starts here*********************************/
   updateIssue() {

            var data ={
                
                    "title": "Found a bug",
                    "body": "I'm having a problem with new this.",
                    "assignees": [
                        "lathajb"
                    ],
                    
                    "state": "open",
                    "labels": [
                        "bug"
                    ]
              }
        
            return fetch(url + 'repos/lathajb/JavaScript-Test-Repo/issues/1', {
                method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "Authorization": "Bearer 322c1ef9d262d07d60eefe8dc14ba8353f2f58f6",
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json()) // parses response to JSON
            .catch(error => console.error(`Fetch Error =\n`, error));
    }


    /**************************create collaborators starts here*********************************/
   createCollaborator() {

            var data ={};
        
            return fetch(url + 'repos/lathajb/JavaScript-Test-Repo/collaborators/sagarpatke', {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "Authorization": "Bearer 322c1ef9d262d07d60eefe8dc14ba8353f2f58f6",
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json()) // parses response to JSON
            .catch(error => console.error(`Fetch Error =\n`, error));
    }
}



//export{getAllIssues,getIssuesForRepo,createRepo}
