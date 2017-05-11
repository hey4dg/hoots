function scrollToTop() {
	$('body').animate({ scrollTop: $('.home').offset().top }, 1000);
}


function scrollToBottom() {
	$('body').animate({ scrollTop: $('.contact').offset().top }, 1000);
}

$('.contact-form').submit(function () {
	var formData = $('.contact-form').serializeArray();
	var errors = validateForm(formData);

	if (errors[0] != "") {
		console.log("errors found");
		$('.form_errors').html(errors[0]);
		return false;
	}

	console.log("no errors, posting");

	$.post("send_form_email.php", formData);
	triggerMessageSent();
	
	return false;
});


function triggerMessageSent() {
	$('.form_wrapper').fadeOut(500, function() {
		$('.form_wrapper').css('display', 'none');
		$('.message_sent').fadeIn(750).css('display','block');
	});
}

function validateForm(data) {

	var numValues = 0;
	for (var i=0; i<data.length; i++){
		if (data[i]['value'] != "") numValues++;
	}

	if (numValues < 2) {
		return ["Name, Email, and Message are required fields"];
	}

	var validName = validateName(escapeHTML(data[0]['value']));
	var validEmail = validateEmail(escapeHTML(data[1]['value']));

	//var validPhone;
	var message;
	
	if (numValues == 2){
		if (data[2]['value'] != "") {
			return ["Message field is required"];
		} else {
			message = escapeHTML(data[2]['value']);
			validPhone = "";
		}
	} 
	// else {
	// 	validPhone = validatePhone(escapeHTML(data[2]['value']));
	// 	message = escapeHTML(data[3]['value']);
	// }

	var errors = [];
	var errorMessage = "";

	if (!validName) errorMessage += 'Valid name required\n<br>';
	if (!validEmail) errorMessage += 'Valid email required\n<br>';
	//if (!validPhone && validPhone != "") errorMessage += 'Valid phone required';

	console.log("errorMessage", errorMessage);

	errors.push(errorMessage);
	console.log("errors", errors);

	return errors;
}

function validateName(name) {
	return /^[A-Za-z .'-]+$/.test(name);
}

function validateEmail(email) {
	return /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
}

// function validatePhone(phone) {
// 	return /[^a-zA-Z.]/.test(phone);
// }

function escapeHTML(text) {

	text.trim();

	var map = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#039;'
	};

	return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
