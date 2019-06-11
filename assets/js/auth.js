$(document).ready(function () {

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

  // Function to handle firebase registration submit
  function handleUserRegistration() {
    event.preventDefault();
    var email = $("#register_email").val();
    var password = $("#register_password").val();
    var displayName = $("#register_name").val();
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Create new user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });

    localStorage.setItem("displayName", displayName);
    console.log(displayName);

    var uid = localStorage.getItem("uid");

    firebase.database().ref('users/' + displayName).set({
      displayName: displayName,
      email: email,
      uid: uid
    });

    $('.modal').hide();



  }

  // Listen for auth state changes
  function initiateAPP() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // If user is signed in:
        var displayName = localStorage.getItem('displayName');
        var email = user.email;
        var uid = user.uid;
        console.log(user, email, uid);
        $("#helloName").show();
        $("#helloName").html("<h2>Hello " + displayName + "!</h2>");
        $("#signInBtn").hide();
        $("#signOutBtn").show();
        return (user);
      } else {
        $("#signInBtn").show();
        $("#signOutBtn").hide();
      }
    })
  }

  initiateAPP();
  //  EVENTS

  // Event handler for registration submit
  $("#register-btn").on("click", function (event) {
    handleUserRegistration();
  });

  // Allow users to sign out. 
  $("#signOutBtn").on("click", function (event) {
    event.preventDefault();
    firebase.auth().signOut().then(function () {
      $('#login-modal').css('display:none');
      console.log("Logged out!");
      // Clear absolutely everything stored in localStorage using localStorage.clear()
      localStorage.clear();
      location.reload(true);
      $("#signInBtn").show();
    });
  });

  // Login existing user
  $("#login-btn").on("click", function (event) {
    event.preventDefault();
    var email = $("#login_email").val().trim();
    var password = $("#login_password").val().trim();
    var user = firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        if (error.code === "auth/invalid-email") {
          $('#login-modal').modal('open');
          alert("Incorrect email format.");
          console.log(error.code);
          console.log(error.message);
          return;
        }
        if (error.code === "auth/user-not-found") {
          $('#login-modal').modal('open');
          alert("Invalid email or password");
          console.log(error.code);
          console.log(error.message);
          return;
        } else {
          $('#login-modal').modal('close');
        }

        localStorageUserId = localStorage.getItem("uid", JSON.stringify(userId));
        console.log(localStorageUserId);
        // userId = firebase.auth().currentUser.uid;

      });
  });



});