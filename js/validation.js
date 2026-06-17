/**
 * validation.js — Contact Form Inline Validation
 * Loaded as a standard script (no ES module syntax)
 */

var Validation = (function () {

  var rules = {
    'contact-name': {
      required: true,
      minLength: 3,
      pattern: /^[A-Za-z\s'\-]+$/,
      messages: {
        required: 'Full name is required.',
        minLength: 'Name must be at least 3 characters.',
        pattern: 'Please enter a valid name (letters only).'
      }
    },
    'contact-email': {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      messages: {
        required: 'Email address is required.',
        pattern: 'Please enter a valid email address.'
      }
    },
    'contact-subject': {
      required: true,
      minLength: 3,
      messages: {
        required: 'Subject is required.',
        minLength: 'Subject must be at least 3 characters.'
      }
    },
    'contact-message': {
      required: true,
      minLength: 10,
      messages: {
        required: 'Message is required.',
        minLength: 'Message must be at least 10 characters.'
      }
    }
  };

  function validateField(input) {
    var id     = input.id;
    var rule   = rules[id];
    if (!rule) return true;

    var value  = input.value.trim();
    var errEl  = document.getElementById(id + '-error');
    var errorMsg = '';

    if (rule.required && !value) {
      errorMsg = rule.messages.required;
    } else if (value && rule.minLength && value.length < rule.minLength) {
      errorMsg = rule.messages.minLength;
    } else if (value && rule.pattern && !rule.pattern.test(value)) {
      errorMsg = rule.messages.pattern;
    }

    if (errorMsg) {
      input.classList.add('error');
      input.classList.remove('success');
      if (errEl) {
        errEl.textContent = '\u26a0 ' + errorMsg;
        errEl.classList.add('visible');
      }
      return false;
    } else {
      input.classList.remove('error');
      input.classList.add('success');
      if (errEl) {
        errEl.textContent = '';
        errEl.classList.remove('visible');
      }
      return true;
    }
  }

  function validateForm(formEl) {
    var inputs   = formEl.querySelectorAll('input, textarea');
    var allValid = true;
    inputs.forEach(function (input) {
      if (!validateField(input)) allValid = false;
    });
    return allValid;
  }

  function attachLiveValidation(formEl) {
    var inputs = formEl.querySelectorAll('input, textarea');
    inputs.forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () {
        if (input.classList.contains('error')) validateField(input);
      });
    });
  }

  function handleSubmit(formEl) {
    var submitBtn  = formEl.querySelector('[type="submit"]');
    var successMsg = document.getElementById('form-success');

    formEl.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm(formEl)) {
        var firstErr = formEl.querySelector('.error');
        if (firstErr) firstErr.focus();
        return;
      }

      // Show loading state
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      // Simulate async submission
      setTimeout(function () {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
        if (successMsg) successMsg.classList.add('show');

        formEl.reset();
        formEl.querySelectorAll('input, textarea').forEach(function (el) {
          el.classList.remove('success', 'error');
        });

        setTimeout(function () {
          if (successMsg) successMsg.classList.remove('show');
        }, 5000);
      }, 1800);
    });
  }

  function init() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    attachLiveValidation(form);
    handleSubmit(form);
  }

  return { init: init, validateField: validateField, validateForm: validateForm };
})();
