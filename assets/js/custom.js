// ============================================
// Contact Form - Slider Value Update
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const sliderInput = document.getElementById('slider-field');
  const sliderValue = document.getElementById('slider-value');

  if (sliderInput && sliderValue) {
    sliderInput.addEventListener('input', function() {
      sliderValue.textContent = this.value;
    });

    sliderValue.textContent = sliderInput.value;
  }

  // ============================================
  // Contact Form Submission Handler
  // ============================================
  
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    setupRealtimeValidation(contactForm);
    
    updateSubmitButtonState(contactForm);
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = {
        vardas: document.getElementById('name-field').value,
        pavarde: document.getElementById('lastname-field').value,
        el_pastas: document.getElementById('email-field').value,
        telefonas: document.getElementById('phone-field').value,
        adresas: document.getElementById('address-field').value,
        klausimas1_vertinimas: document.querySelector('input[name="rating1"]:checked')?.value || 'Nepasirinkta',
        klausimas2_vertinimas: document.querySelector('input[name="rating2"]:checked')?.value || 'Nepasirinkta',
        slider_reiksme: document.getElementById('slider-field').value,
        gimimo_data: document.getElementById('expiry-date-field').value,
        komentaras: document.getElementById('comment-field').value
      };

      if (!validateFormData(formData)) {
        console.error('Formos validacija nepavyko!');
        return;
      }

      console.log('=== FORMOS DUOMENYS ===');
      console.log('Vardas:', formData.vardas);
      console.log('Pavardė:', formData.pavarde);
      console.log('El. paštas:', formData.el_pastas);
      console.log('Telefono numeris:', formData.telefonas);
      console.log('Adresas:', formData.adresas);
      console.log('Klausimas 1 (1-10):', formData.klausimas1_vertinimas);
      console.log('Klausimas 2 (1-10):', formData.klausimas2_vertinimas);
      console.log('Slider klausimas:', formData.slider_reiksme);
      console.log('Gimimo data:', formData.gimimo_data);
      console.log('Komentaras:', formData.komentaras);
      console.log('======================');

      displayFormData(formData);

      showSuccessMessage();

      this.reset();
    });
  }
});

function validateFormData(formData) {
  const nameRegex = /^[a-žA-Ž\s]+$/u;
  
  if (!formData.vardas.trim()) {
    alert('Prašome nurodyti vardą!');
    return false;
  }
  
  if (!nameRegex.test(formData.vardas.trim())) {
    alert('Vardas turi būti sudarytas tik iš raidžių!');
    return false;
  }
  
  if (!formData.pavarde.trim()) {
    alert('Prašome nurodyti pavardę!');
    return false;
  }
  
  if (!nameRegex.test(formData.pavarde.trim())) {
    alert('Pavardė turi būti sudaryta tik iš raidžių!');
    return false;
  }
  
  if (!formData.el_pastas.trim() || !isValidEmail(formData.el_pastas)) {
    alert('Prašome nurodyti teisingą el. pašto adresą!');
    return false;
  }
  
  if (!formData.telefonas.trim()) {
    alert('Prašome nurodyti telefono numerį!');
    return false;
  }
  
  if (!formData.adresas.trim()) {
    alert('Prašome nurodyti adresą!');
    return false;
  }
  
  if (formData.klausimas1_vertinimas === 'Nepasirinkta') {
    alert('Prašome atsakyti į 1 klausimą!');
    return false;
  }
  
  if (formData.klausimas2_vertinimas === 'Nepasirinkta') {
    alert('Prašome atsakyti į 2 klausimą!');
    return false;
  }
  
  if (!formData.gimimo_data) {
    alert('Prašome nurodyti gimimo datą!');
    return false;
  }

  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displayFormData(formData) {
  let displayContainer = document.getElementById('form-data-display');
  
  if (!displayContainer) {
    displayContainer = document.createElement('div');
    displayContainer.id = 'form-data-display';
    displayContainer.className = 'mt-5 p-4 border rounded';
    displayContainer.style.backgroundColor = 'rgba(92, 201, 245, 0.1)';
    displayContainer.style.borderColor = '#5CC9F5';
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.appendChild(displayContainer);
    }
  }

  const rating1 = parseInt(formData.klausimas1_vertinimas) || 0;
  const rating2 = parseInt(formData.klausimas2_vertinimas) || 0;
  const sliderValue = parseInt(formData.slider_reiksme) || 0;
  const averageRating = ((rating1 + rating2 + sliderValue) / 3).toFixed(1);

  let html = '<h3 style="color: #98FFCC; margin-bottom: 20px;">Pateikti Formos Duomenys</h3>';
  html += '<div class="row">';
  html += '<div class="col-md-6">';
  html += '<p><strong>Vardas:</strong> ' + escapeHtml(formData.vardas) + '</p>';
  html += '<p><strong>Pavardė:</strong> ' + escapeHtml(formData.pavarde) + '</p>';
  html += '<p><strong>El. paštas:</strong> <a href="mailto:' + escapeHtml(formData.el_pastas) + '">' + escapeHtml(formData.el_pastas) + '</a></p>';
  html += '<p><strong>Telefono numeris:</strong> <a href="tel:' + escapeHtml(formData.telefonas) + '">' + escapeHtml(formData.telefonas) + '</a></p>';
  html += '<p><strong>Adresas:</strong> ' + escapeHtml(formData.adresas) + '</p>';
  html += '</div>';
  html += '<div class="col-md-6">';
  html += '<p><strong>Klausimas 1 :</strong> ' + formData.klausimas1_vertinimas + '/10</p>';
  html += '<p><strong>Klausimas 2 :</strong> ' + formData.klausimas2_vertinimas + '/10</p>';
  html += '<p><strong>Slider klausimas:</strong> ' + formData.slider_reiksme + '</p>';
  html += '<p><strong>Gimimo data:</strong> ' + formData.gimimo_data + '</p>';
  html += '</div>';
  html += '</div>';
  
  html += '<div style="margin-top: 25px; padding-top: 20px; border-top: 2px solid #5CC9F5;">';
  html += '<h4 style="color: #5CC9F5; margin-bottom: 15px;">Vertinimo Rezultatai:</h4>';
  html += '<p style="font-size: 18px; padding: 15px; background-color: rgba(152, 255, 204, 0.1); border-radius: 8px; border-left: 4px solid #98FFCC;">';
  html += '<strong>' + 'Klausimų vidurkis: ' + averageRating + '</strong>';
  html += '</p>';
  html += '</div>';
  
  if (formData.komentaras.trim()) {
    html += '<p style="margin-top: 15px;"><strong>Komentaras:</strong></p>';
    html += '<p style="padding: 10px; background-color: rgba(255,255,255,0.05); border-radius: 5px;">' + escapeHtml(formData.komentaras) + '</p>';
  }

  displayContainer.innerHTML = html;
  displayContainer.style.display = 'block';

  displayContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function setupRealtimeValidation(form) {
  const nameField = document.getElementById('name-field');
  const lastnameField = document.getElementById('lastname-field');
  const emailField = document.getElementById('email-field');
  const phoneField = document.getElementById('phone-field');
  const addressField = document.getElementById('address-field');
  
  const nameRegex = /^[a-žA-Ž\s]*$/u;

  if (nameField) {
    nameField.addEventListener('blur', function() {
      validateFieldRealtime(this, nameRegex, 'Vardas turi būti sudarytas tik iš raidžių!');
    });
    nameField.addEventListener('input', function() {
      clearFieldError(this);
    });
  }

  if (lastnameField) {
    lastnameField.addEventListener('blur', function() {
      validateFieldRealtime(this, nameRegex, 'Pavardė turi būti sudaryta tik iš raidžių!');
    });
    lastnameField.addEventListener('input', function() {
      clearFieldError(this);
    });
  }

  if (emailField) {
    emailField.addEventListener('blur', function() {
      if (this.value.trim() && !isValidEmail(this.value)) {
        showFieldError(this, 'Neteisinga el. pašto formato!');
      } else {
        clearFieldError(this);
      }
    });
    emailField.addEventListener('input', function() {
      clearFieldError(this);
    });
  }

  if (phoneField) {
    phoneField.addEventListener('blur', function() {
      if (!this.value.trim()) {
        showFieldError(this, 'Telefono numeris yra būtinas!');
      } else {
        clearFieldError(this);
      }
    });
    phoneField.addEventListener('input', function() {
      clearFieldError(this);
      this.value = formatPhoneNumber(this.value);
    });
  }

  if (addressField) {
    addressField.addEventListener('blur', function() {
      if (!this.value.trim()) {
        showFieldError(this, 'Adresas yra būtinas!');
      } else {
        clearFieldError(this);
      }
    });
    addressField.addEventListener('input', function() {
      clearFieldError(this);
      updateSubmitButtonState(form);
    });
  }

  const allInputs = form.querySelectorAll('input, textarea, select');
  allInputs.forEach(input => {
    input.addEventListener('change', function() {
      updateSubmitButtonState(form);
    });
    input.addEventListener('input', function() {
      updateSubmitButtonState(form);
    });
  });
}

function validateFieldRealtime(field, regex, errorMessage) {
  const form = field.closest('form');
  if (field.value.trim() && !regex.test(field.value.trim())) {
    showFieldError(field, errorMessage);
  } else if (!field.value.trim()) {
    showFieldError(field, 'Šis laukas yra būtinas!');
  } else {
    clearFieldError(field);
  }
  if (form) {
    updateSubmitButtonState(form);
  }
}

function showFieldError(field, errorMessage) {
  field.classList.add('is-invalid');
  
  const existingError = field.parentElement.querySelector('.error-text');
  if (existingError) {
    existingError.remove();
  }
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-text';
  errorDiv.textContent = errorMessage;
  field.parentElement.appendChild(errorDiv);
}

function clearFieldError(field) {
  field.classList.remove('is-invalid');
  const errorDiv = field.parentElement.querySelector('.error-text');
  if (errorDiv) {
    errorDiv.remove();
  }
}

function submitFormViaAjax(form, formData) {
  console.log('Formos duomenys paruošti siuntimui:', formData);
}

function showSuccessMessage() {
  const loadingMsg = document.querySelector('.loading');
  if (loadingMsg) {
    loadingMsg.style.display = 'block';
  }

  setTimeout(() => {
    if (loadingMsg) loadingMsg.style.display = 'none';
    
    const sentMessage = document.querySelector('.sent-message');
    if (sentMessage) {
      sentMessage.style.display = 'block';
    }
    
    const errorMsg = document.querySelector('.error-message');
    if (errorMsg) errorMsg.style.display = 'none';
    
    setTimeout(() => {
      if (sentMessage) sentMessage.style.display = 'none';
    }, 5000);
  }, 1000);
}

function formatPhoneNumber(input) {
  let digits = input.replace(/\D/g, '');
  
  if (digits.startsWith('370')) {
    if (digits.length <= 3) {
      return '+' + digits;
    } else if (digits.length <= 5) {
      return '+' + digits.slice(0, 3) + ' ' + digits.slice(3);
    } else if (digits.length <= 8) {
      return '+' + digits.slice(0, 3) + ' ' + digits.slice(3, 5) + ' ' + digits.slice(5);
    } else {
      return '+' + digits.slice(0, 3) + ' ' + digits.slice(3, 5) + ' ' + digits.slice(5, 8) + ' ' + digits.slice(8, 11);
    }
  } else {
    if (digits.length === 0) {
      return '';
    }
    
    if (!digits.startsWith('370')) {
      digits = '370' + digits;
    }
    
    if (digits.length <= 3) {
      return '+' + digits;
    } else if (digits.length <= 5) {
      return '+' + digits.slice(0, 3) + ' ' + digits.slice(3);
    } else if (digits.length <= 8) {
      return '+' + digits.slice(0, 3) + ' ' + digits.slice(3, 5) + ' ' + digits.slice(5);
    } else {
      return '+' + digits.slice(0, 3) + ' ' + digits.slice(3, 5) + ' ' + digits.slice(5, 8) + ' ' + digits.slice(8, 11);
    }
  }
}

function updateSubmitButtonState(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn) return;

  const nameField = form.querySelector('#name-field');
  const lastnameField = form.querySelector('#lastname-field');
  const emailField = form.querySelector('#email-field');
  const phoneField = form.querySelector('#phone-field');
  const addressField = form.querySelector('#address-field');
  const rating1 = form.querySelector('input[name="rating1"]:checked');
  const rating2 = form.querySelector('input[name="rating2"]:checked');
  const sliderField = form.querySelector('#slider-field');
  const birthdayField = form.querySelector('#expiry-date-field');

  const nameRegex = /^[a-žA-Ž\s]+$/u;

  let isValid = true;

  if (!nameField || !nameField.value.trim() || !nameRegex.test(nameField.value.trim())) {
    isValid = false;
  }

  if (!lastnameField || !lastnameField.value.trim() || !nameRegex.test(lastnameField.value.trim())) {
    isValid = false;
  }

  if (!emailField || !emailField.value.trim() || !isValidEmail(emailField.value)) {
    isValid = false;
  }

  if (!phoneField || !phoneField.value.trim()) {
    isValid = false;
  }

  if (!addressField || !addressField.value.trim()) {
    isValid = false;
  }

  if (!rating1) {
    isValid = false;
  }

  if (!rating2) {
    isValid = false;
  }

  if (!birthdayField || !birthdayField.value) {
    isValid = false;
  }

  const invalidFields = form.querySelectorAll('.is-invalid');
  if (invalidFields.length > 0) {
    isValid = false;
  }

  submitBtn.disabled = !isValid;
  
  if (isValid) {
    submitBtn.style.opacity = '1';
    submitBtn.style.cursor = 'pointer';
  } else {
    submitBtn.style.opacity = '0.5';
    submitBtn.style.cursor = 'not-allowed';
  }
}
