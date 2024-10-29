document.querySelector("form").addEventListener("submit", function (event) {
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const gender = document.getElementById("gender").value;
  const phone = document.getElementById("phone").value.trim();
  const bio = document.getElementById("bio").value.trim();

  if (!firstName || !lastName || !email || !password || !gender || !phone) {
    event.preventDefault(); // Prevents User from submitting the form
    alert("All fields are required!");
  } else if (!validateEmail(email)) {
    event.preventDefault();
    alert("Please enter a valid email.");
  } else if (!validatePassword(password)) {
    event.preventDefault();
    alert(
      "Password must contain at least one uppercase letter, one number, and one special character!"
    );
  } else if (!validatePhone(phone)) {
    event.preventDefault();
    alert("Phone number bad, do better");
  }

  document.getElementById("first-name").value = sanitize(firstName);
  document.getElementById("last-name").value = sanitize(lastName);
  document.getElementById("email").value = sanitize(email);
  hashPass(password).then((hashedPassword) => {
    document.getElementById("password").value = hashedPassword;
  });
  document.getElementById("phone").value = sanitize(phone);
  document.getElementById("bio").value = sanitize(bio);
});

function sanitize(toSanitize) {
  const tempDiv = document.createElement("div");
  tempDiv.textContent = toSanitize;
  tempDiv.innerText = tempDiv.textContent;
  toSanitize = tempDiv.innerHTML;
  console.log(toSanitize);
  return toSanitize;
}

async function hashPass(password) {
  const digest = await window.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );

  return await Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
}

function validatePhone(phoneNumber) {
  const phonePattern =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phonePattern.test(phoneNumber);
}

/*  End of Validation of User Input *****************************************/
