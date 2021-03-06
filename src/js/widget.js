'use-strict';

import { createRepository, fetchAllIssuesForSpecificRepo, createIssueForRepo, updateIssue, createCollaborator } from './index.js';

export default class WidgetTemplate {
  constructor() {
    console.log('Inside WidgetTemplate Layer');
  }

  /**********************************Create repository template ******************** */
  createRepositoryTemplate(queryName) {
    $.get('./src/pages/createRepository.html', (result) => {
      const widget = document.getElementById('createWidget');

      if (widget !== null) {
        const parentObj = document.getElementById('searchFeature');
        parentObj.removeChild(document.getElementById('createWidget'));
        // parentObj.append(result);
      }
      $('#searchFeature').append(result);
      $('#createRepository').val(queryName);
      $('#createWidget').ready(() => {
        console.log(document.getElementById('confirmId'));
        document.getElementById('confirmId').addEventListener('click', createRepository.bind(null, queryName));
      });
    });
  }


  /**********************************Create issue template ******************** */
  createIssueTemplate(issueReqObj) {
    $.get('./src/pages/createIssue.html', (result) => {
      const widget = document.getElementById('createWidget');

      if (widget !== null) {
        const parentObj = document.getElementById('searchFeature');
        parentObj.removeChild(document.getElementById('createWidget'));
        // parentObj.append(result);
      }

      $('#searchFeature').append(result);
      $('#createIssue').val(issueReqObj.issueName);
       $('#createWidget').ready(() => {
        console.log(document.getElementById('confirmId'));
        document.getElementById('confirmId').addEventListener('click', createIssueForRepo.bind(null, issueReqObj));
      });
    });
  }


  /**********************************Update issue template ******************** */
  updateIssue(updateIssueReq) {
    $.get('./src/pages/updateIssue.html', (result) => {
      const widget = document.getElementById('createWidget');

      if (widget !== null) {
        const parentObj = document.getElementById('searchFeature');
        parentObj.removeChild(document.getElementById('createWidget'));
        // parentObj.append(result);
      }

      $('#searchFeature').append(result);
      $('#issueNumber').val(updateIssueReq.id);
      $('#repo').val(updateIssueReq.repo);
      $('#confirmId').ready(() => {
        console.log(document.getElementById('confirmId'));
        document.getElementById('confirmId').addEventListener('click', updateIssue.bind(null, updateIssueReq));
      });
    });
  }


   /**********************************create Collaborator template ******************** */
  createCollaborator(collaboratorReqObj) {
    $.get('./src/pages/collaborator.html', (result) => {
      const widget = document.getElementById('createWidget');

      if (widget !== null) {
        const parentObj = document.getElementById('searchFeature');
        parentObj.removeChild(document.getElementById('createWidget'));
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
      const widget = document.getElementById('createWidget');

      if (widget !== null) {
        const parentObj = document.getElementById('searchFeature');
        parentObj.removeChild(document.getElementById('createWidget'));
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

          document.getElementById('tr'+count).innerHTML = issue.number;
          document.getElementById('issueName'+count).innerHTML = issue.title;
          document.getElementById('issueDescription'+count).innerHTML = issue.body;
          count++;
      });
  }

}

export function renderConfirmMsg(msg,msgType){
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



