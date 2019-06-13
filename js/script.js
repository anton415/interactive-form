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

/*
  Some events are at the same day and time as others. If the user selects a
  workshop, don't allow selection of a workshop at the same day and time.
*/
const $activitiesFieldset = $('.activities');
const $main = $('input[name=all]');
const $jsFrameworks = $('input[name=js-frameworks]');
const $jsLibs = $('input[name=js-libs]');
const $jsExpress = $('input[name=express]');
const $node = $('input[name=node]');
const $buildTools = $('input[name=build-tools]');
const $npm = $('input[name=npm]');
var total = 0;
const $totalLabel = $('<label></label>').text('Total: ' + total)

$main.change(() => {
  if ($main.is(":checked")) {
    total += 200;
  } else {
    total -= 200;
  }
});

$jsFrameworks.change(() => {
  if ($jsFrameworks.is(":checked")) {
    total += 100;
    $jsExpress.attr("disabled", true);
  } else {
    total -= 100;
    $jsExpress.removeAttr("disabled");
  }
});

$jsExpress.change(() => {
  if ($jsExpress.is(":checked")) {
    total += 100;
    $jsFrameworks.attr("disabled", true);
  } else {
    total -= 100;
    $jsFrameworks.removeAttr("disabled");
  }
});

$buildTools.change(() => {
  if ($buildTools.is(":checked")) {
    total += 100;
  } else {
    total -= 100;
  }
});

$jsLibs.change(() => {
  if ($jsLibs.is(":checked")) {
    total += 100;
    $node.attr("disabled", true);
  } else {
    total -= 100;
    $node.removeAttr("disabled");
  }
});

$node.change(() => {
  if ($node.is(":checked")) {
    total += 100;
    $jsLibs.attr("disabled", true);
  } else {
    total -= 100;
    $jsLibs.removeAttr("disabled");
  }
});

$npm.change(() => {
  if ($npm.is(":checked")) {
    total += 100;
  } else {
    total -= 100;
  }
});

/*
  As a user selects activities, a running total should display below the list
  of checkboxes.
*/
$activitiesFieldset.change(() => {
  $('#total').remove();
  if (total > 0) {
    $activitiesFieldset.append($('<label></label>').attr('id', 'total').text('Total: ' + total));
  }
});


// Display payment sections based on the payment option chosen in the select menu.
const $payment = $('#payment');
const $selectMethod = $('#payment option[value="select_method"]');

const $creditCard = $('#payment option[value="credit card"]');
const $paypal = $('#payment option[value="paypal"]');
const $bitcoin = $('#payment option[value="bitcoin"]');

const $creaditCardDiv = $('#credit-card');
const $paypalDiv = $("body > div > form > fieldset:nth-child(4) > div:nth-child(5)");
const $bitcoinDiv = $("body > div > form > fieldset:nth-child(4) > div:nth-child(6)");

/*
  The user should not be able to select the "Select Payment Method" option from
  the payment select menu.
*/
$selectMethod.remove();

/*
  The "Credit Card" payment option should be selected by default.
  Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information.
*/
$creditCard.attr("selected", true);
$paypalDiv.hide();
$bitcoinDiv.hide();

$payment.change(() => {
  if($creditCard.is(':selected')) {
    $creaditCardDiv.show();
    $paypalDiv.hide();
    $bitcoinDiv.hide();
  } else if($paypal.is(':selected')) {
    $creaditCardDiv.hide();
    $paypalDiv.show();
    $bitcoinDiv.hide();
  } else if($bitcoin.is(':selected')) {
    $creaditCardDiv.hide();
    $paypalDiv.hide();
    $bitcoinDiv.show();
  }
});

// Validation before submit.
const $submitButton = $('button[type=submit]');
const $nameInput = $('#name');
const $mail = $('#mail');
const $cardNumber = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');

$submitButton.click((e) => {
  e.preventDefault();
  // Name field can't be blank.
  if (!$nameInput.val()) {
    $nameInput.css('border-color', 'red');
  } else {
    $nameInput.css('border-color', '');
  }
  // Email field must be a validly formatted e-mail address.
  const $mailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!$mailRegex.test($mail.val())) {
    $mail.css('border-color', 'red');
  } else {
    $mail.css('border-color', '');
  }
  /*
    User must select at least one checkbox under the "Register for Activities"
    section of the form.
  */
  if (total === 0) {
    $activitiesFieldset.css('color', 'red');
  } else {
    $activitiesFieldset.css('color', '');
  }
  /*
    If the selected payment option is "Credit Card," make sure the user has
    supplied a Credit Card number, a Zip Code, and a 3 number CVV value before
    the form can be submitted.
  */
  if($creditCard.is(':selected')) {
    const $cardNumberRegex = /^\d{13,16}$/;
    if (!$cardNumberRegex.test($cardNumber.val())) {
      $cardNumber.css('border-color', 'red');
    } else {
      $cardNumber.css('border-color', '');
    }
    const $zipRegex = /^\d{5}$/;
    if (!$zipRegex.test($zip.val()))  {
      $zip.css('border-color', 'red');
    } else {
      $zip.css('border-color', '');
    }
    const $cvvRegex = /^\d{3}$/;
    if (!$cvvRegex.test($cvv.val()))  {
      $cvv.css('border-color', 'red');
    } else {
      $cvv.css('border-color', '');
    }
  }
});
