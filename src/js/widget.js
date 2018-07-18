'use-strict';


export default class WidgetTemplate {
  constructor() {
    console.log('Inside WidgetTemplate Layer');
  }

  /** ********************************Create repository template ******************** */
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
    });
  }


  /** ********************************Create issue template ******************** */
  createIssueTemplate() {
    $.get('./src/pages/createIssue.html', (result) => {
      const widget = document.getElementById('createIssueWidget');

      if (widget !== null) {
        const parentObj = document.getElementById('searchFeature');
        parentObj.removeChild(document.getElementById('createIssueWidget'));
        // parentObj.append(result);
      }

      $('#searchFeature').append(result);
      $('#createIssue').val($('#searchId').val());
    });
  }
}
