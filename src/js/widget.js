'use-strict';

import { createRepository, fetchAllIssuesForSpecificRepo, createIssueForRepo, updateIssue, createCollaborator } from './index.js';

export default class WidgetTemplate {
  constructor() {
    console.log('Inside WidgetTemplate Layer');
  }

  /**********************************Create repository template ******************** */
  createRepositoryTemplate(queryName) {
    $.get('./src/pages/createRepository.html', (result) => {
      const widget = document.getElementById('createRepoWidget');

      if (widget !== null) {
        const parentObj = document.getElementById('searchFeature');
        parentObj.removeChild(document.getElementById('createRepoWidget'));
        // parentObj.append(result);
      }
      $('#searchFeature').append(result);
      $('#createRepository').val(queryName);
      $('#createRepoWidget').ready(() => {
        console.log(document.getElementById('confirmId'));
        document.getElementById('confirmId').addEventListener('click', createRepository.bind(null, queryName));
      });
    });
  }


  /**********************************Create issue template ******************** */
  createIssueTemplate(issueReqObj) {
    $.get('./src/pages/createIssue.html', (result) => {
      const widget = document.getElementById('createIssueWidget');

      if (widget !== null) {
        const parentObj = document.getElementById('searchFeature');
        parentObj.removeChild(document.getElementById('createIssueWidget'));
        // parentObj.append(result);
      }

      $('#searchFeature').append(result);
      $('#createIssue').val(issueReqObj.issueName);
       $('#createIssueWidget').ready(() => {
        console.log(document.getElementById('confirmId'));
        document.getElementById('confirmId').addEventListener('click', createIssueForRepo.bind(null, issueReqObj));
      });
    });
  }


  /**********************************Update issue template ******************** */
  updateIssue(updateIssueReq) {
    $.get('./src/pages/updateIssue.html', (result) => {
      const widget = document.getElementById('updateIssueWidget');

      if (widget !== null) {
        const parentObj = document.getElementById('searchFeature');
        parentObj.removeChild(document.getElementById('updateIssueWidget'));
        // parentObj.append(result);
      }

      $('#searchFeature').append(result);
      $('#confirmId').ready(() => {
        console.log(document.getElementById('confirmId'));
        document.getElementById('confirmId').addEventListener('click', updateIssue.bind(null, updateIssueReq));
      });
    });
  }


   /**********************************create Collaborator template ******************** */
  createCollaborator(collaboratorReqObj) {
    $.get('./src/pages/collaborator.html', (result) => {
      const widget = document.getElementById('createCollaboratorWidget');

      if (widget !== null) {
        const parentObj = document.getElementById('searchFeature');
        parentObj.removeChild(document.getElementById('createCollaboratorWidget'));
        // parentObj.append(result);
      }

      $('#searchFeature').append(result);
      $('#confirmId').ready(() => {
        console.log(document.getElementById('confirmId'));
        document.getElementById('confirmId').addEventListener('click', createCollaborator.bind(null, collaboratorReqObj));
      });
    });
  }


  

  /**********************************Fetch issues for specific repository template ******************** */
  fetchIssuesForRepositoryTemplate() {
    $.get('./src/pages/displayIssuesForRepo.html', (result) => {
      const widget = document.getElementById('fetchIssues');

      if (widget !== null) {
        const parentObj = document.getElementById('searchFeature');
        parentObj.removeChild(document.getElementById('fetchIssues'));
        // parentObj.append(result);
      }
      $('#searchFeature').append(result);
      $('#confirmId').ready(() => {
         document.getElementById('confirmId').addEventListener('click', fetchAllIssuesForSpecificRepo);
      });
    });

  };


  fetchIssuesTableTemplate(issuesList){
      var issueList = document.getElementById('issues-details');

      var count = 1;
      issuesList.forEach(issue => {
      console.log(issue.title + " " + issue.body);
          var issueDetailsDive = document.createElement('tr');
          var issueDetialsSno = document.createElement('th');
              issueDetialsSno.setAttribute('scope','row');
              issueDetialsSno.setAttribute('id','tr'+count);
          var issueName = document.createElement('td');
              issueName.setAttribute('scope','col');
              issueName.setAttribute('id','issueName'+count);
          var issueDescription = document.createElement('td');
              issueDescription.setAttribute('scope','col');
              issueDescription.setAttribute('id','issueDescription'+count);
              
          issueDetailsDive.append(issueDetialsSno);
          issueDetailsDive.append(issueName);
          issueDetailsDive.append(issueDescription);
          issueList.append(issueDetailsDive);

          document.getElementById('tr'+count).innerHTML = count;
          document.getElementById('issueName'+count).innerHTML = issue.title;
          document.getElementById('issueDescription'+count).innerHTML = issue.body;
          count++;
      });
  }




}


