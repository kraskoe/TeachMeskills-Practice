export function validateForm() {
	const form = document.querySelector('.footer__form');

	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();
		removeValidationErrors();

		let error = formValidate(form);

		if (error === 0) {
			form.reset();
			alert("Subscribed successfully");
		} else {
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
					let errorMessage = generateError("Please enter a correct e-mail address");
					input.parentElement.insertBefore(errorMessage, input)
				}
			}
		}

		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	function generateError(text) {
		let errorMessage = document.createElement('div')
		errorMessage.className = '_error-message'
		errorMessage.style.color = '#f38281'
		errorMessage.innerHTML = text
		return errorMessage
	}

	function removeValidationErrors() {
		let errorMessages = form.querySelectorAll('._error-message');
		for (let i = 0; i < errorMessages.length; i++) {
			errorMessages[i].remove();
		}
	}
}