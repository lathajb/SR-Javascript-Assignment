'usestrict'
//import {getAllIssues,getIssuesForRepo,createRepo} from "./services/github-manage-service"

import "../sass/styles.scss";
import GitHubManageController from "./controllers/github-manage-controller"

 let gitController = new GitHubManageController();

document.addEventListener("DOMContentLoaded", function(event) {
    //console.log(document.getElementById("searchQuery").textContent());
    document.getElementById("searchQuery").addEventListener("click",createWidget);
    
});


function invokeRecastApi(){
    // const recastai = require('recastai')
    // const client = new recastai.request('YOUR_REQUEST_TOKEN', 'en')

    // client.analyseText('hello')
    // .then(function(res) {
    //     if (res.intent()) { console.log('Intent: ', res.intent().slug) }
    //     if (res.intent().slug === 'YOUR_EXPECTED_INTENT') {
    //     // Do your code...
    //     }
    // })
}


function createWidget(){

   var widgetDiv = document.createElement("div");
   widgetDiv.setAttribute("id","createRepoWidget");

   var  cardDiv = document.createElement("div");
   cardDiv.setAttribute("class","card");

   var cardBody = document.createElement("div");
   cardBody.setAttribute("class","card-body");
   cardBody.setAttribute("id","cardBody");

   var cardTitle = document.createElement("h5");
   cardTitle.setAttribute("class","card-header");
   cardTitle.setAttribute("id","cardHeader");
   

   var cardTitileTextNode = document.createTextNode("Create Repository");         // Create a text node
   cardTitle.appendChild(cardTitileTextNode); 


   cardDiv.append(cardTitle);
   cardDiv.append(cardBody);
   widgetDiv.append(cardDiv);


  // document.getElementById('searchFeature').appendChild(widgetDiv);
  var resp = "repo";
  if(resp === "repo"){
    createRepositoryTemplate();
  }else if(resp === "issue"){
    createIssueTemplate();
  }
  
    

}


function createRepositoryTemplate(){
    $.get('./src/pages/createRepository.html', function(result){
        
        var widget = document.getElementById("createRepoWidget");
        
        if(widget !== null){
           var parentObj = document.getElementById("searchFeature");
           parentObj.removeChild(document.getElementById("createRepoWidget"));
           //parentObj.append(result);  
        }
        
           $('#searchFeature').append(result);
           $('#createRepository').val($('#searchId').val());
           $('#createRepository').ready(function() {
                //console.log(document.getElementById("confirmId"));
                document.getElementById("confirmId").addEventListener("click",createRepository);
            });
    });
}




function createIssueTemplate(){
    $.get('./src/pages/createIssue.html', function(result){
        var widget = document.getElementById("createIssueWidget");
        
        if(widget !== null){
           var parentObj = document.getElementById("searchFeature");
           parentObj.removeChild(document.getElementById("createIssueWidget"));
           //parentObj.append(result);  
        }
        
           $('#searchFeature').append(result);
           $('#createIssue').val($('#searchId').val());
    });
}


function createRepository(){
            gitController.createRepository()
             .then(function(data){
                 console.log(data);
                 window.confirm("Repository Created Successfully");
                 document.location.reload();
             }).catch(function(error) {
                 console.log('There has been a problem with your create repository operation: ', error.message);
                 window.confirm("Error While Creating Respository");
             });
}

function fetchAllIssuesForSpecificRepo(){
   
             gitController.getAllIssuesForSpecificRepo()
             .then(function(data){
                 console.log(data);
             }).catch(function(error) {
                 console.log('There has been a problem with your fetch all issues for given repo operation: ', error.message);
             });
             
}

function createIssueForRepo(){
        gitController.createIssueForRepo()
             .then(function(data){
                 console.log(data);
             }).catch(function(error) {
                 console.log('There has been a problem with your create issue for repo operation: ', error.message);
             });
}

function updateIssue(){
            gitController.updateIssue()
             .then(function(data){
                 console.log(data);
             }).catch(function(error) {
                 console.log('There has been a problem with your update/open or reopen issue operation: ', error.message);
             });
}

function createCollaborator(){
            gitController.createCollaborator()
             .then(function(data){
                 console.log(data);
             }).catch(function(error) {
                 console.log('There has been a problem with your create collaborator operation: ', error.message);
             });
}

