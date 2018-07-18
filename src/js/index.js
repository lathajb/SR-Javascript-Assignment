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

document.addEventListener('DOMContentLoaded', (event) => {
  // console.log(document.getElementById("searchQuery").textContent());
  document.getElementById('searchQuery').addEventListener('click', invokeRecastApi);
});


function invokeRecastApi() {
  const searchQuery = document.getElementById('searchId').value;
  let queryName = null;
  let invokeMethodType = null;
  recastController.invokeCreateRepositoryApi(searchQuery)
    .then((data) => {
      console.log(data);
      if (data.results.entities.git_repo !== null) {
        queryName = JSON.stringify(data.results.entities.git_repo[0].value);
        console.log(`repository name :${JSON.stringify(data.results.entities.git_repo[0])}`);
      }

      invokeMethodType = JSON.stringify(data.results.entities.string[0].value);
      methodToInvoke(queryName, invokeMethodType);

      console.log(`query name :${JSON.stringify(data.results.entities.string[0].value)}`);
    }).catch((error) => {
      console.log('There has been a problem while Invoking Recast API: ', error.message);
      window.confirm('Error While Invoking Recast API');
    });
}


function methodToInvoke(queryName, invokeMethodType) {
  if (invokeMethodType === 'repo' || 'myrepo' || 'repository') {
    // widgetTemplate.createRepositoryTemplate(queryName);
    createRepositoryTemplate(queryName);
  } else if (invokeMethodType === 'issue') {

  } else if (invokeMethodType === 'list' || 'display') {

  } else if (invokeMethodType === 'reopen' || 'close') {

  } else if (invokeMethodType === 'colloborator') {

  }
}

function createRepositoryTemplate(queryName) {
  $.get('./src/pages/createRepository.html', (result) => {
    const widget = document.getElementById('createRepoWidget');

    if (widget !== null) {
      const parentObj = document.getElementById('searchFeature');
      parentObj.removeChild(document.getElementById('createRepoWidget'));
      // parentObj.append(result);
    }

    $('#searchFeature').append(result);

    $('#createRepository').val(queryName);
    $('#createRepository').ready(() => {
      console.log(document.getElementById('confirmId'));
      document.getElementById('confirmId').addEventListener('click', createRepository.bind(null, queryName));
    });
  });
}

function createRepository(queryName) {
  console.log('this is createRepository() method');
  gitController.createRepository(queryName)
    .then((data) => {
      console.log(data);
      window.confirm('Repository Created Successfully');
      document.location.reload();
    }).catch((error) => {
      console.log('There has been a problem with your create repository operation: ', error.message);
      window.confirm('Error While Creating Respository');
    });
}

function fetchAllIssuesForSpecificRepo() {
  gitController.getAllIssuesForSpecificRepo()
    .then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log('There has been a problem with your fetch all issues for given repo operation: ', error.message);
    });
}

function createIssueForRepo() {
  gitController.createIssueForRepo()
    .then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log('There has been a problem with your create issue for repo operation: ', error.message);
    });
}

function updateIssue() {
  gitController.updateIssue()
    .then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log('There has been a problem with your update/open or reopen issue operation: ', error.message);
    });
}

function createCollaborator() {
  gitController.createCollaborator()
    .then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log('There has been a problem with your create collaborator operation: ', error.message);
    });
}
