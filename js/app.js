  var Validator = {

      constructor: function(form, config) {
          this.formElement = form;
          this.validationElements = config.fields || {};

          this.init();
      },

      init: function() {
          this.addFormListener();
      },

      addFormListener: function() {
          var formSelector = this.formElement,
              elForm = document.querySelector(formSelector);

          elForm.addEventListener('submit', this.validate.bind(this), false);
      },

      validate: function(e) {
          var elFields = this.validationElements;
          var successCount = 0;
          var emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          for (var field in elFields) {
              var el = document.querySelector(field),
                  elVal = el.value;

              if ((elFields[field].checks == 'required' || $.inArray('required', elFields[field].checks) >= 0) && elVal == '') {
                  el.classList.add('invalid');
                  var errorEl = document.getElementsByClassName(elFields[field].field);
                  errorEl[0].classList.add('show');
                  errorEl[0].innerHTML = 'This Field is Required';
              } else if (elFields[field].field == 'email' && !emailRegEx.test(elVal) && elVal != '') {
                  errorEl = document.getElementsByClassName(elFields[field].field)
                  errorEl[0].classList.add('show');
                  errorEl[0].innerHTML = 'Please Enter a valid Email Address';
              } else {
                  el.classList.remove('invalid');
                  var errorEl = document.getElementsByClassName(elFields[field].field);
                  errorEl[0].classList.remove('show');
                  successCount++;
              }
          }
          if (successCount == Object.keys(this.validationElements).length) {
              document.getElementsByClassName('all')[0].classList.add('showInline');
          } else {
              document.getElementsByClassName('all')[0].classList.remove('showInline');
          }
          e.preventDefault();
      }

  }