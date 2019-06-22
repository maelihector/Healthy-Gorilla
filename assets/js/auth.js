// Add Firebase to HealthyGorillaApp web app
var firebaseConfig = {
  apiKey: "AIzaSyCPIfGudl6LOhVtt2vIM-lDUTdHa33WPLI",
  authDomain: "healthygorilla.firebaseapp.com",
  databaseURL: "https://healthygorilla.firebaseio.com",
  projectId: "healthygorilla",
  storageBucket: "healthygorilla.appspot.com",
  messagingSenderId: "977887423528",
  appId: "1:977887423528:web:c9dbade3d29fb137"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function () {

  // Function to handle new user registration
  function handleUserRegistration() {
    // Grab user information from DOM
    var email = $("#register_email").val();
    var password = $("#register_password").val();
    var displayName = $("#register_name").val();
    // Make sure user enters email address
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    // Make sure password is over 4 characters long
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Create new user with user email and password and check for firebase errors
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (user) {
        let uid = user.uid;
        // Save user info to firebase database
        firebase.database().ref('users/' + uid).set({
          displayName: displayName,
          email: email
        });
        // Save user info to local storage
        setLocalStorge(displayName, email, uid);
        console.log(user);
        greetUser(displayName);
        // Handle Errors here.
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // Allow for firebase to check password weakness
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    // Hide registration modal --** Doesn't quite work yet
    $('#login-modal').modal('close');
  }

  // Function event to handle user sign out
  function handleUserSignOut() {
    firebase.auth().signOut().then(function () {
      $('#login-modal').css('display:none');
      console.log("Logged out!");
      // Clear absolutely everything stored in localStorage using localStorage.clear()
      localStorage.clear();
      location.reload(true);
      $("#signInBtn").show();
    });
  }

  // Functione event to handle user login
  function handleUserLogIn() {
    var email = $("#login_email").val().trim();
    var password = $("#login_password").val().trim();

    // Make sure user enters email address
    if (email.length < 4) {
      alert('Please enter an email address.');
      return false;
    }
    // Make sure password is over 4 characters long
    if (password.length < 4) {
      alert('Please enter a password.');
      return false;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function (user) {
        $('#login-modal').modal('close');
        $("#signInBtn").hide();
        $("#signOutBtn").show();
        console.log(user);
        console.log(user.user.uid);
        getUserData(user.user.uid);
      }).catch(function (error) {
        if (error.code === "auth/invalid-email") {
          $('#login-modal').modal('open');
          alert("Incorrect email format.");
          console.log(error.code);
          console.log(error.message);
          $("#signInBtn").show();
          $("#signOutBtn").hide();
          return;
        }
        if (error.code === "auth/user-not-found") {
          $('#login-modal').modal('open');
          alert("Invalid email or password");
          console.log(error.code);
          console.log(error.message);
          $("#signInBtn").show();
          $("#signOutBtn").hide();
          return;
        }
      });
  }

  // Function that finds user data 
  function getUserData(user) {
    return firebase.database().ref('/users/' + user).once('value').then(function (snapshot) {
      var displayName = (snapshot.val() && snapshot.val().displayName);
      var userEmail = (snapshot.val() && snapshot.val().email);
      console.log(displayName);
      console.log(userEmail);
      greetUser(displayName);
      setLocalStorge(displayName, userEmail, user);
    });
  }

  // Function that changes HTML when user is signed in
  function greetUser(displayName) {
    $("#helloName").show();
    $("#helloName").html("<h2>Hello " + displayName + "!</h2>"); // works after refresh if user didn't sign out
    $("#signInBtn").hide();
    $("#signOutBtn").show();
  }

  // Function to set local storaage
  function setLocalStorge(displayName, email, uid) {
    localStorage.setItem("displayName", displayName);
    localStorage.setItem("email", email);
    localStorage.setItem("uid", uid);
    console.log(displayName, email, uid);
  }

  // Functiont hat initiates app by checking if a user logged in.
  function checkIfSignedIn() {
    let displayName = localStorage.getItem('displayName');
    console.log(displayName);
    if (displayName) {
      greetUser(displayName);
    } else {
      console.log("No user is logged in");
      localStorage.clear();
      $("#signInBtn").show();
    }
  }

  checkIfSignedIn();

  // Function to send a password reset link to user
  function sendPasswordReset() {
    let email = $("#lost_email").val();
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function () {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
  }

  //  ** EVENTS **

  // Event handler for new user registration submit
  $("#register-btn").on("click", function (event) {
    event.preventDefault();
    handleUserRegistration();
  });

  // Event handler for signing out user
  $("#signOutBtn").on("click", function (event) {
    event.preventDefault();
    handleUserSignOut();
  });

  // Event handler for logging in user
  $("#login-btn").on("click", function (event) {
    event.preventDefault();
    handleUserLogIn();
  });

  // Event handler for resetting user password
  $("#password-reset-btn").on("click", function (event) {
    event.preventDefault();
    sendPasswordReset();
  })



});