'usestrict';

// import {getAllIssues,getIssuesForRepo,createRepo} from "./services/github-manage-service"
// const recastai = require('recastai');
import '../sass/styles.scss';
import WidgetTemplate from './widget';
import GitHubManageController from './controllers/github-manage-controller';
import RecastApiController from './controllers/recast-api-controller';


const widgetTemplate = new WidgetTemplate();
const gitController = new GitHubManageController();
const recastController = new RecastApiController();




let allIssues = null;
var reqObj = {
  "user": "lathajb",
  "repoName": null
}
var issueReqObj = {
  "user": "lathajb",
  "repoName": null,
  "issueName": null,
  "issueDesc": null,
  "id": null
}
var updateReqObject = {
  "user": "lathajb",
  "issueName": null,
  "issueDesc": null,
  "issueStatus": null,
  "id": null,
  "repo": null
}

var collaboratorReqObj = {
  "user": "lathajb",
  "repoName": null,
  "collaborator": "sagarpatke"
}


document.addEventListener('DOMContentLoaded', (event) => {
  // console.log(document.getElementById("searchQuery").textContent());
  $('[data-toggle="tooltip"]').tooltip();
  document.getElementById('searchQuery').addEventListener('click', invokeRecastApi);
});


function invokeRecastApi() {
  const searchQuery = document.getElementById('searchId').value;
  var queryName = null;
  var invokeMethodType = null;
  recastController.invokeCreateRepositoryApi(searchQuery)
    .then((data) => {
      console.log(data);
      
      if(typeof data.results.intents[0].slug !== 'undefined' &&  data.results.intents[0].slug !== null ){
          
          
          if (data.results.intents[0].slug === 'create-repo' && typeof data.results.entities.git_repo !== 'undefined' && data.results.entities.git_repo !== null) {
            queryName = data.results.entities.git_repo[0].value;
            console.log(`repository name :${JSON.stringify(data.results.entities.git_repo[0])}`);
            invokeMethodType = data.results.entities.string[0].value;
          }
          if ( data.results.intents[0].slug === 'create-issue' && typeof data.results.entities.git_issue !== 'undefined' && data.results.entities.git_issue !== null) {
            queryName = data.results.entities.git_issue[0].value;
            console.log(`repository name :${JSON.stringify(data.results.entities.git_issue[0])}`);
            invokeMethodType = data.results.entities.string[0].value;
          }

          if (data.results.intents[0].slug === 'fetch-repo-issues' && typeof data.results.entities.fetch_issues !== 'undefined' && data.results.entities.fetch_issues !== null) {
            invokeMethodType = data.results.entities.fetch_issues[0].value;
            console.log(`repository name :${JSON.stringify(data.results.entities.fetch_issues[0])}`);
            
          }

          if (data.results.intents[0].slug === 'update-issue' && typeof data.results.entities.update_issue !== 'undefined' && data.results.entities.update_issue !== null) {
            invokeMethodType = data.results.entities.update_issue[0].value;
            console.log(`repository name :${JSON.stringify(data.results.entities.update_issue[0])}`);
            if(data.results.entities.git_repo[0] !== null)
            updateReqObject.repo = data.results.entities.git_repo[0].value;

            if(data.results.entities.number[0] !== null)
            updateReqObject.id = data.results.entities.number[0].scalar;
          }

          if ( data.results.intents[0].slug === 'create-collaborator' && 
               typeof data.results.entities.git_collaborator !== 'undefined' && 
               data.results.entities.git_collaborator !== null) {
               invokeMethodType = data.results.entities.git_collaborator[0].value;
            console.log(`repository name :${JSON.stringify(data.results.entities.git_collaborator[0])}`);
            
          }
      }
      

      methodToInvoke(queryName, invokeMethodType);

      //console.log(`query name :${JSON.stringify(data.results.entities.string[0].value)}`);
    }).catch((error) => {
      console.log('There has been a problem while Invoking Recast API: ', error.message);
      //window.confirm('Error While Invoking Recast API');
      renderConfirmMsg(error.message,"error");
    });
}


function methodToInvoke(queryName, invokeMethodType) {


  if (invokeMethodType === "repo" || invokeMethodType === "myrepo" || invokeMethodType === "repository") {
    widgetTemplate.createRepositoryTemplate(queryName);
  } else if (invokeMethodType === "issue" || invokeMethodType === "create issue") {
    issueReqObj.issueName = queryName;
    widgetTemplate.createIssueTemplate(issueReqObj);
  } else if (invokeMethodType === "read" || invokeMethodType === "display" || invokeMethodType === "fetch" || invokeMethodType === "find") {
    widgetTemplate.fetchIssuesForRepositoryTemplate();
  } else if (invokeMethodType === "reopen" || invokeMethodType === "close" || invokeMethodType === "update" ||  invokeMethodType === "modify" || invokeMethodType === "change") {
    widgetTemplate.updateIssue(updateReqObject);
  } else if (invokeMethodType === 'collaborator') {
    widgetTemplate.createCollaborator(collaboratorReqObj);

  }
}

function fetchIssuesList(allIssues) {
  widgetTemplate.fetchIssuesTableTemplate(allIssues);
}

export function createRepository(queryName) {
  console.log('this is createRepository() method');
  gitController.createRepository(queryName)
    .then((data) => {
      console.log(data);
      
      if (data.message !== null &&  (data.message === "Not Found" || data.message === "Bad credentials")) {
        renderConfirmMsg(data.message,"error");
      } else {
       
        window.confirm('Repository Created Successfully');
        var msg = 'Repository Created Successfully';
        renderConfirmMsg(msg,"success");
        //document.location.reload();
      }


    }).catch((error) => {
      console.log('There has been a problem with your create repository operation: ', error.message);
      //window.confirm('Error While Creating Respository');
      var msg = 'Error While Creating Repository';
       renderConfirmMsg(error.message,"error");
    });
}

export function fetchAllIssues() {
  gitController.getAllIssues()
    .then((data) => {
      console.log(data); allIssues = data;
      fetchIssuesList(allIssues);
    }).catch((error) => {
      console.log('There has been a problem with your fetch all issues for given repo operation: ', error.message);
      var msg = 'Error While Creating Collaborator';
       renderConfirmMsg(msg,"error");
    });
}


export function fetchAllIssuesForSpecificRepo() {
  var repoName = document.getElementById('repositoryName').value;

  reqObj.repoName = repoName;
  gitController.getAllIssuesForSpecificRepo(reqObj.user, reqObj.repoName)
    .then((data) => {
      console.log(data); 
      
       if (data.message !== null &&  (data.message === "Not Found" || data.message === "Bad credentials")) {
            renderConfirmMsg(data.message,"error");
        } else {
            allIssues = data;
            fetchIssuesList(allIssues);
            //document.location.reload();
      }

    }).catch((error) => {
      console.log('There has been a problem with your fetch all issues for given repo operation: ', error.message);
      var msg = 'Error While Creating Collaborator';
       renderConfirmMsg(msg,"error");
    });
}

export function createIssueForRepo(issueReqObj) {

  var repoName = document.getElementById('repositoryName').value;
  issueReqObj.repoName = repoName;
  issueReqObj.issueDesc = document.getElementById('issueDescription').value
  gitController.createIssueForRepo(issueReqObj)
    .then((data) => {
      console.log(JSON.stringify(data));
      
      if (data.message !== null &&  (data.message === "Not Found" || data.message === "Bad credentials")) {
        renderConfirmMsg(data.message,"error");
      } else {
       
       window.confirm('Issue Created Successfully');
       var msg = 'Issue Created Successfully';
        renderConfirmMsg(msg,"success");
        //document.location.reload();
      }


    }).catch((error) => {
      console.log('There has been a problem with your create issue for repo operation: ', error.message);
      //window.confirm('Error While Creating Issue Successfully');
      var msg = 'Error While Creating Issue';
       renderConfirmMsg(msg,"error");
    });
}

export function updateIssue(updateReqObject) {
  updateReqObject.id = document.getElementById('issueNumber').value;
  updateReqObject.issueDesc = document.getElementById('issueDescription').value;
  updateReqObject.issueName = document.getElementById('issueName').value;
  updateReqObject.issueStatus = document.getElementById('issueStatus').value;
  updateReqObject.repo = document.getElementById('repo').value;

  gitController.updateIssue(updateReqObject)
    .then((data) => {
      console.log(data);
      
      if (data.message !== null &&  (data.message === "Not Found" || data.message === "Bad credentials")) {
        renderConfirmMsg(data.message,"error");
      } else {
       
       window.confirm('Issue Updated Successfully');
       var msg = 'Issue Updated Successfully';
        renderConfirmMsg(msg,"success");
        //document.location.reload();
      }



    }).catch((error) => {
      console.log('There has been a problem with your update/open or reopen issue operation: ', error.message);
      //window.confirm('Error While Updating Issue Successfully');
      var msg = 'Error While Creating Collaborator';
      renderConfirmMsg(msg,"error");
    });
}

export function createCollaborator(collaboratorReqObj) {
  collaboratorReqObj.repoName = document.getElementById('repoName').value;

  gitController.createCollaborator(collaboratorReqObj)
    .then((data) => {
      console.log(data);

      if (data.message !== null &&  (data.message === "Not Found" || data.message === "Bad credentials")) {
        //window.confirm('Repository or Collaborator Not Found');
        var msg = 'Repository or Collaborator Not Found';
        renderConfirmMsg(data.message,"error");
      } else {
       // document.location.reload();
       var msg = 'Collaborator Created Successfully';
        renderConfirmMsg(msg,"success");
      }

    }).catch((error) => {
      console.log('There has been a problem with your create collaborator operation: ', error.message);
      window.confirm('Error While Creating Collaborator');
       var msg = 'Error While Creating Collaborator';
       renderConfirmMsg(msg,"error");
    });
}


function renderConfirmMsg(msg,msgType){
  var respMsg = document.getElementById('msgRendered');
  var header = document.getElementById('responseMsg');
  if(respMsg !== null){
    header.removeChild(respMsg);
  }
  var msgRendered = document.createElement('div')
  
  if(msgType === "error"){
    
    msgRendered.setAttribute('class','alert alert-danger alert-dismissible fade show w-100');
    msgRendered.setAttribute('role','alert');
    msgRendered.setAttribute('id','msgRendered');
  }else if( msgType === "success"){
    
    msgRendered.setAttribute('class','alert alert-success alert-dismissible fade show w-100');
    msgRendered.setAttribute('role','alert');
    msgRendered.setAttribute('id','msgRendered');
  }

  var strong = document.createElement('strong');
  var textNode = document.createTextNode(msg);
  strong.append(textNode);

  var closeButton = document.createElement('button');
  closeButton.setAttribute('type','button');
  closeButton.setAttribute('class','close');
  closeButton.setAttribute('data-dismiss','alert');
  closeButton.setAttribute('aria-label','Close');
  //closeButton.onclick = closeMsgBox;

  var xicon = document.createTextNode('x');
  var spanDiv = document.createElement('span');
  spanDiv.setAttribute('aria-hidden','true');
  spanDiv.setAttribute('class','msg');
  spanDiv.append(xicon);
  closeButton.append(spanDiv);

  msgRendered.append(strong);
  msgRendered.append(closeButton);

 
  header.append(msgRendered);  
}
