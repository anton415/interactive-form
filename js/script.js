// When the page first loads, the first text field should be in focus by default.
$('#name').focus();

/*
  Include a text field that will be revealed when the "Other" option is
  selected from the "Job Role" drop down menu.
*/
const $jobRoleTitle = $('#title');
const $textboxForJobRoleTitle = $("<input type=text id=other-title placeholder='Your Job Role' style='display:none'>");

$jobRoleTitle.after($textboxForJobRoleTitle);

$jobRoleTitle.change(() => {
  if ($jobRoleTitle.val() == 'other') {
    $textboxForJobRoleTitle.show();
  } else {
    $textboxForJobRoleTitle.hide();
  }
});
