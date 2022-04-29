$(window).on("load", function() {
  setTimeout(function() {
    class PersonDocument {
      original = "";
      digits = "";
      type = "";

      constructor(original, type) {
        this.original = original;
        this.digits = original.replace(/[^\d]/g, "");

        if (
          typeof type !== "undefined" &&
          (type === "CNPJ" || type === "LEGAL")
        )
          this.type = function() {
            return "CNPJ";
          };
        else if (
          typeof type !== "undefined" &&
          (type === "CPF" || type === "NATURAL")
        )
          this.type = function() {
            return "CPF";
          };
        else
          this.type = function() {
            return this.detectType(original);
          };
      }

      documentType() {
        return this.type();
      }

      digits() {
        return this.digits;
      }

      format() {
        return this.isValid() ? this["format" + this.type()]() : this.original;
      }

      formatCPF() {
        return ("000000000" + this.digits)
          .substr(-11)
          .replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
      }

      formatCNPJ() {
        return ("000000000" + this.digits)
          .substr(-14)
          .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
      }

      isCPF() {
        return this.type() === "CPF" || this.type() === "NATURAL";
      }

      isCNPJ() {
        return this.type() === "CNPJ" || this.type() === "LEGAL";
      }

      isValidCPF() {
        var s, n, i;
        var c = this.original;
        if ((c = c.replace(/[^\d]/g, "").split("")).length !== 11) return false;
        if (new RegExp("^" + c[0] + "{11}$").test(c.join(""))) return false;
        for (s = 10, n = 0, i = 0; s >= 2; n += c[i++] * s--);
        if (parseInt(c[9], 10) !== ((n %= 11) < 2 ? 0 : 11 - n)) return false;
        for (s = 11, n = 0, i = 0; s >= 2; n += c[i++] * s--);
        if (parseInt(c[10], 10) !== ((n %= 11) < 2 ? 0 : 11 - n)) return false;
        return true;
      }

      isValidCNPJ() {
        var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
          c = this.original;
        var i, n;
        if ((c = c.replace(/[^\d]/g, "").split("")).length !== 14) return false;

        for (i = 0, n = 0; i < 12; n += c[i] * b[++i]);
        if (parseInt(c[12], 10) !== ((n %= 11) < 2 ? 0 : 11 - n)) return false;
        for (i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
        if (parseInt(c[13], 10) !== ((n %= 11) < 2 ? 0 : 11 - n)) return false;
        return true;
      }

      isValid() {
        return this["isValid" + this.type()]();
      }

      detectType() {
        const value = String(this.original).replace(/\D/g, "");
        return value.length > 11 ? "CNPJ" : "CPF";
      }
    }

    function MascaraDocumento(campoDocumento) {
      if (mascaraInteiro(campoDocumento) == false) {
        event.returnValue = false;
      }
      if (campoDocumento.value.length < 14)
        return formataCampo(campoDocumento, "000.000.000-00", event);
      if (campoDocumento.value.length > 17) event.returnValue = false;
      return formataCampo(campoDocumento, "00.000.000/0000-00", event);
    }

    //valida numero inteiro com mascara
    function mascaraInteiro() {
      if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
        return false;
      }
      return true;
    }

    //formata de forma generica os campos
    function formataCampo(campo, Mascara, evento) {
      var boleanoMascara;

      var Digitato = evento.keyCode;
      exp = /\-|\.|\/|\(|\)| /g;
      campoSoNumeros = campo.value.toString().replace(exp, "");

      var posicaoCampo = 0;
      var NovoValorCampo = "";
      var TamanhoMascara = campoSoNumeros.length;

      if (Digitato != 8) {
        // backspace
        for (i = 0; i <= TamanhoMascara; i++) {
          boleanoMascara =
            Mascara.charAt(i) == "-" ||
            Mascara.charAt(i) == "." ||
            Mascara.charAt(i) == "/";
          boleanoMascara =
            boleanoMascara ||
            Mascara.charAt(i) == "(" ||
            Mascara.charAt(i) == ")" ||
            Mascara.charAt(i) == " ";
          if (boleanoMascara) {
            NovoValorCampo += Mascara.charAt(i);
            TamanhoMascara++;
          } else {
            NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
            posicaoCampo++;
          }
        }
        campo.value = NovoValorCampo;
        return true;
      } else {
        return true;
      }
    }

    documentInput = $('input[name="document"], input[name="cnpj_do_seu_contador"], input[name="company_document"], input[name="user_document"]');
    $("<span id='feedback'></span>").insertAfter(documentInput);

    documentInput.on("keypress", function() {
      MascaraDocumento(this);
    });

    documentInput.on("input", function() {
      
      personDocument = new PersonDocument(this.value);
      if (!personDocument.isValid()) {
        $('#feedback').html("Documento inválido.");
        $('input[type="submit"]').attr("disabled", "disabled").css("background", "#ccc");
        
      } else {
        $('#feedback').html("");
        $('input[type="submit"]').removeAttr("disabled style");
      }
    });
    // formRecord = document.forms[0];
    // formRecord.addEventListener("submit", function(evt) {
    //   evt.preventDefault();
    // });
  }, 1000);
});

$("body").on(
  "focus",
  'input[name="telefone"], input[name="telefone_do_seu_contador"], input[name="phone"], input[name="user_phone"]',
  function() {
    var maskBehavior = function(val) {
        return val.replace(/\D/g, "").length === 11
          ? "(00) 00000-0000"
          : "(00) 0000-00009";
      },
      options = {
        onKeyPress: function(val, e, field, options) {
          field.mask(maskBehavior.apply({}, arguments), options);

          if (field[0].value.length >= 14) {
            var val = field[0].value.replace(/\D/g, "");
            var intRegex = /[0-9 -()+]+$/;
            if (/\d\d(\d)\1{7,8}/.test(val)) {
              field[0].value = "";
              notif({
                msg: "<b>Atenção!</b> Este número é inválido!",
                type: "error",
                position: "center"
              });
            }
          }
        },
        clearIfNotMatch: true
      };
    $(this).mask(maskBehavior, options);
  }
);
