document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Clear previous error messages
    clearErrors();
  
    // Get form values
    let firstName = document.getElementById('firstName').value.trim();
    let lastName = document.getElementById('lastName').value.trim();
    let email = document.getElementById('email').value.trim();
    let question = document.getElementById('question').value.trim();
  
    // Validate fields
    let isValid = true;
  
    // First Name validation
    if (firstName === '') {
      showError('firstNameError', 'First name is required.');
      isValid = false;
    }
  
    // Last Name validation
    if (lastName === '') {
      showError('lastNameError', 'Last name is required.');
      isValid = false;
    }
  
    // Email validation (simple regex check)
    if (email === '') {
      showError('emailError', 'Email is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError('emailError', 'Please enter a valid email address.');
      isValid = false;
    }
  
    // Question validation
    if (question === '') {
      showError('questionError', 'Please enter a question.');
      isValid = false;
    }
  
    // Prevent form submission if not valid
    if (!isValid) {
      event.preventDefault();
    }
  });
  
  // Helper functions
  function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
  }
  
  function clearErrors() {
    document.getElementById('firstNameError').textContent = '';
    document.getElementById('lastNameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('questionError').textContent = '';
  }
  
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }