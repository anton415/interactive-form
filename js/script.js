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

/*
  For the T-Shirt "Color" menu, only display the color options that match the
  design selected in the "Design" menu.
*/
const $designSelect = $('#design');
const $colorSelect = $('#color');

$colorSelect.empty().append(
  $('<option></option>').attr('value', 'default').text('First, Select Desig Theme')
);

$designSelect.change(() => {
  console.log($designSelect.val());
  if ($designSelect.val() == 'js puns') {
    $colorSelect.empty().append(
      $('<option></option>').attr('value', 'cornflowerblue').text('Cornflower Blue'),
      $('<option></option>').attr('value', 'darkslategrey').text('Dark Slate Grey'),
      $('<option></option>').attr('value', 'gold').text('Gold')
    );
  } else if ($designSelect.val() == 'heart js') {
    $colorSelect.empty().append(
      $('<option></option>').attr('value', 'tomato').text('Tomato'),
      $('<option></option>').attr('value', 'steelblue').text('Steel Blue'),
      $('<option></option>').attr('value', 'dimgrey').text('Dim Grey')
    );
  } else {
    $colorSelect.empty().append(
      $('<option></option>').attr('value', 'default').text('First, Select Desig Theme')
    );
  }
});
