let signinEmail = document.getElementById("signinEmail");
let signinPassword = document.getElementById("signinPassword");
let incorrectLogin = document.getElementById("incorrectLogin");
let signupName = document.getElementById("signupName");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");
let invalidName = document.getElementById("invalidName");
let invalidEmail = document.getElementById("invalidEmail");
let invalidPassword = document.getElementById("invalidPassword");
let loginButton = document.getElementById("loginButton");
let signupButton = document.getElementById("signupButton");
// Get the username from the query parameter

const nameRegex = /^[a-zA-Z ]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
let userList = [];

if (JSON.parse(localStorage.getItem("users")) != null) {
  userList = JSON.parse(localStorage.getItem("users"));
} else {
  userList = [];
}

if (signupName && signupEmail && signupPassword) {
  signupName.addEventListener("change", function () {
    signupValidation(nameRegex, signupName, invalidName);
  });
  signupEmail.addEventListener("change", function () {
    signupValidation(emailRegex, signupEmail, invalidEmail);
    isUsed();
  });
  signupPassword.addEventListener("change", function () {
    signupValidation(passwordRegex, signupPassword, invalidPassword);
  });
}

function signupValidation(regexCode, input, invalidAlert) {
  if (regexCode.test(input.value) == true) {
    invalidAlert.classList.add("d-none");
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    invalidAlert.classList.remove("d-none");
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

if (signupButton) {
  signupButton.addEventListener("click", function () {
    signup();
  });
}

function isUsed() {
  for (let i = 0; i < userList.length; i++) {
    if (signupEmail.value == userList[i].email) {
      invalidEmail.classList.remove("d-none");
      invalidEmail.innerHTML = "email already exists";
      signupEmail.classList.remove("is-valid");
      signupEmail.classList.add("is-invalid");
      return true;
    }
  }
}

function signup(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  if (
    signupValidation(nameRegex, signupName, invalidName) &&
    signupValidation(emailRegex, signupEmail, invalidEmail) &&
    signupValidation(passwordRegex, signupPassword, invalidPassword) &&
    !isUsed()
  ) {
    let user = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };
    userList.push(user);
    localStorage.setItem("users", JSON.stringify(userList));
    // Moved the console.log here to display updated list
    window.location.href = "index.html"; // Redirect to the login page
  }
}
console.log(userList);

const urlParams = new URLSearchParams(window.location.search);
let userName = urlParams.get("user");

// Display the username
document.getElementById("helloUser").innerHTML = `Hello ${userName}`;
function loginValidation() {
  for (let i = 0; i < userList.length; i++) {
    if (
      userList[i].email == signinEmail.value &&
      userList[i].password == signinPassword.value
    ) {
      userName = userList[i].name;
      return true;
    }
  }
}

function login(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  if (loginValidation() == true) {
    incorrectLogin.classList.add("d-none");
    // Redirect to the home page with username as a query parameter
    window.location.href = `home.html?user=${userName}`;
  } else {
    incorrectLogin.classList.remove("d-none");
  }
}

// function isUsed() {}
// // Function to validate name using regex
// function validateName() {
//   const nameRegex = /^[a-zA-Z ]+$/;
//   return nameRegex.test(signupName.value);
// }

// // Function to validate email using regex
// function validateEmail() {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// // Function to validate password using regex
// function validatePassword(password) {
//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return passwordRegex.test(password);
// }

// // Function to handle signup
// function signup() {
//   const name = document.getElementById("signupName").value;
//   const email = document.getElementById("signupEmail").value;
//   const password = document.getElementById("signupPassword").value;

//   // Check if email is already used
//   const users = JSON.parse(localStorage.getItem("users")) || [];
//   if (users.some((user) => user.email === email)) {
//     alert("Email is already used. Please choose another one.");
//     return;
//   }

//   // Validate name, email, and password
//   if (
//     !validateName(name) ||
//     !validateEmail(email) ||
//     !validatePassword(password)
//   ) {
//     alert("Please provide valid name, email, and password.");
//     return;
//   }

//   // Store the user data in an array and local storage
//   const newUser = { name, email, password };
//   users.push(newUser);
//   localStorage.setItem("users", JSON.stringify(users));

//   // Redirect to home.html or perform other actions after successful signup
//   window.location.href = "home.html";
// }

// // Function to handle login
// function login() {
//   const email = document.getElementById("loginEmail").value;
//   const password = document.getElementById("loginPassword").value;

//   // Retrieve user data from local storage
//   const users = JSON.parse(localStorage.getItem("users")) || [];

//   // Check if email and password match any user
//   const user = users.find(
//     (user) => user.email === email && user.password === password
//   );

//   if (user) {
//     // Successful login
//     window.location.href = "home.html";
//   } else {
//     // Incorrect email or password
//     document.getElementById("loginError").innerText =
//       "Incorrect email or password.";
//   }
// }
