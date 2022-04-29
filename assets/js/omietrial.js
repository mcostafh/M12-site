$(document).ready(function () {
	var form = $('form[name="registerform"]');

	var errorMessages = [
		{ field: 'nickname', message: 'Preencha este campo com o seu nome completo' },
		{ field: 'user_email', message: 'Preencha com um e-mail válido, ex. seu@email.com' },
		{ field: 'phone', message: 'O telefone é obrigatório' },
		{ field: 'company', message: 'Qual o nome da empresa?' },
		{ field: 'company_document', message: 'O documento (CNPJ ou CPF) é obrigatório' },
		{ field: 'accept', message: 'Você precisa aceitar os termos de contrato' }
	];

	var getErrorMessage = function (field) {
		for (var index = 0; index < errorMessages.length; index++) {
			var error = errorMessages[index];

			if (error.field === field) {
				return error.message;
			}
		}
	};

	var preValidPostTimer = undefined;
	var preValidLastCheck = '';
	var preValid = function (targetForm, callback, callbackError) {
		clearTimeout(preValidPostTimer);
		preValidPostTimer = (targetForm.serialize() != preValidLastCheck) && setTimeout(function () {
			_formLock(targetForm, true);
			$.ajax({
				type: 'POST',
				url: 'https://app.m12.com.br/partners/m12/m12trial/?q=prevalid',
				xhrFields: {
					withCredentials: true
				},
				data: targetForm.serialize(),
				success: callback,
				error: callbackError
			});
			preValidLastCheck = targetForm.serialize();
		}, 150);
	};

	var m12ShowMessage = function (targetForm, msg, element) {
		var container = targetForm.parent();

		if (typeof element !== 'undefined') {
			var failBlock = $(".text-helper." + element, container);
		} else {
			var failBlock = $(".w-form-fail", container);
		}

		if (typeof msg == 'string' && msg.length > 0) {
			failBlock.html(msg);

			failBlock.show();
		} else {
			failBlock.hide();
		}
	};

	var m12ShowMessageFull = function (targetForm, msg) {
		var container = targetForm.parent();

		if (typeof msg == 'string' && msg.length > 0) {
			$('#textModal-experimente').html("");

			container.html(msg);

			container.show();
		} else {
			container.hide();
		}
	};

	var _formLock = function (targetForm, lock) {
		if (lock) {
			targetForm.find('input, textarea, select').addClass('disabled').attr('readonly', true);
			targetForm.find('button,input[type="button"],input[type="submit"]').addClass('disabled').attr('disabled', true);
		} else {
			targetForm.find('input, textarea, select').removeClass('disabled').attr('readonly', false);
			targetForm.find('button,input[type="button"],input[type="submit"]').removeClass('disabled').attr('disabled', false);
		}
	};

	var sendRegisterForm = function (e) {
		var targetForm = $(e.delegateTarget);

		m12ShowMessage(targetForm);

		$(".text-helper").html("");
		$('button[name="wp-submit"]>.spinner-border').removeClass('d-none');

		var data = form.serializeArray();
		var error = false;

		for (var index = 0; index < data.length; index++) {
			var field = data[index];

			if (field.name !== "redirect_to" && field.value === "") {
				m12ShowMessage(targetForm, getErrorMessage(field.name), field.name);
				error = true;
			}
		}

		var elEmail = $("input[name=user_email]");
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(elEmail.val())) {
			m12ShowMessage(targetForm, getErrorMessage('user_email'), 'user_email');
			error = true;
		}

		var accept = data.find(function (field) {
			return field.name === 'accept';
		});

		if (!accept) {
			m12ShowMessage(targetForm, getErrorMessage('accept'));
			error = true;
		}

		if (error) {
			$('button[name="wp-submit"]>.spinner-border').addClass('d-none');
			return;
		}

		preValid(targetForm, function validDocument(res) {
			_formLock(targetForm, false);

			if (res.status != 'OK') {
				m12ShowMessage(targetForm, res.message, res.field);

				$('button[name="wp-submit"]>.spinner-border').addClass('d-none');
			} else {
				form.submit();
			}
		});
	};

	form.delegate('button[name=wp-submit]', 'click', sendRegisterForm);

	var submitButton = form.find('button[name=wp-submit]');
	$('<input type="hidden" name="token" id="token" value="s47b6hz58z0f">').insertBefore(submitButton);
	form.on("submit", function (e) {
		var targetForm = $(e.delegateTarget);

		e.preventDefault();

		_formLock(targetForm, true);

		$.ajax({
			type: 'POST',
			url: 'https://app.m12.com.br/register/',
			xhrFields: {
				withCredentials: true
			},
			data: targetForm.serialize(),
			success: function (res) {
				if (typeof res !== 'object') {
					m12ShowMessage(targetForm, 'Eita! Aconteceu algum problema ao habilitar o aplicativo para você...<br><br>Entre em contato com a gente pelo chat para resolvermos rapidinho com você :)');
				} else if (res.status == 'ERROR' || res.status == 'REGISTER_FAIL') {
					m12ShowMessage(targetForm, res.message);
				} else if (res.status == 'REGISTER_DONE') {
					var modal = targetForm.parents('div.modal.show');

					if (modal) {
						modal.addClass('conclusao-trial');

						// setTimeout(function() {
						// 	modal.removeClass('conclusao-trial');
						// }, 1000);
					}

					m12ShowMessageFull(targetForm, "Seu aplicativo foi criado com sucesso. Basta clicar no link de confirmação que foi enviado para o seu e-mail para finalizar :-)");

					dataLayer.push({
						'event': 'Interaction',
						'EventCategory': 'm12-lead-sucesso',
						'EventAction': 'lead-trial-envio-sucesso',
						'TipoLead':'lead-trial'
					});

					var texto = window.location.href
					if(texto.includes('fit')) {
						dataLayer.push({
							'event': 'Interaction', 
							'EventCategory': 
							'm12-lead-sucesso', 
							'EventAction': 'lead-fit-envio-sucesso',
							'TipoLead':'lead-fit'
						});
					}

					return;
				}

				$('button[name="wp-submit"]>.spinner-border').addClass('d-none');

				_formLock(targetForm, false);
			},
			error: function (e) {
				_formLock(targetForm, false);

				$('button[name="wp-submit"]>.spinner-border').addClass('d-none');

				m12ShowMessage(targetForm, 'Oops! Alguma coisa deu errado. Converse com nossa equipe no chat para ajudá-lo :-)');
			}
		});

		return false;
	});
});

var css = '.disabled { opacity: 0.5; }' +
	'.pwd-group {margin-top: 15px;}.pwd-group .pwd-label {font-size: 10x; padding: 12px 0 12px 7px;text-align: center;vertical-align: middle;}.pwd-group .pwd-box {border-radius: 3px;display: inline-block;width: 20px;height: 9px;background-color: #fefefe;border: 1px solid darkgray;transition: width .4s linear;}.pwd-group.worst .pwd-box.box-0,.pwd-group.bad .pwd-box.box-0,.pwd-group.bad .pwd-box.box-1 {background-color: #ffe4e4;border: 1px solid darkred;color: darkred;}.pwd-group.weak .pwd-box.box-0,.pwd-group.weak .pwd-box.box-1,.pwd-group.weak .pwd-box.box-2 {background-color: #ffe082;border: 1px solid darkorange;color: black;}.pwd-group.good .pwd-box.box-0,.pwd-group.good .pwd-box.box-1,.pwd-group.good .pwd-box.box-2,.pwd-group.good .pwd-box.box-3 {background-color: #66b04e;border: 1px solid green;color: black;}.pwd-group.strong .pwd-box.box-0,.pwd-group.strong .pwd-box.box-1,.pwd-group.strong .pwd-box.box-2,.pwd-group.strong .pwd-box.box-3,.pwd-group.strong .pwd-box.box-4 {background-color: darkgreen;border: 1px solid green;color: white;}' +
	'.w-form-fail {padding-top: 15px;}',
	head = document.head || document.getElementsByTagName('head')[0],
	style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet) {
	// This is required for IE8 and below.
	style.styleSheet.cssText = css;
} else {
	style.appendChild(document.createTextNode(css));
}
