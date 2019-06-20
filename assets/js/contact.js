$(document).ready(function () {

  // Function to push contact message to firebase
  function sendMessage(user, contactName, contactEmail, contactMessage) {

    // Create entry
    let newMessage = {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
      user: user
    };

    console.log("saved message to database");
    // POST user message
    return firebase.database().ref('/messages/').push(newMessage);

  }

  // Function to sign out anonymous user after message has been sent
  function signOutAnonymous() {
    firebase.auth().signOut().then(function () {

      console.log("Logged out anonymous!");
      // Clear absolutely everything stored in localStorage using localStorage.clear()
      localStorage.clear();

    });
  }

  // Function event to call sendMessage() function with appropriate user uid (user or anonymous)
  $(document).on('click', '#sendMessage', function () {
    // Grab message values
    let contactName = $("#contact-name").val();
    let contactEmail = $("#contact-email").val();
    let contactMessage = $("#contact-message").val();

    console.log(contactName, contactEmail, contactMessage);

    let userUid;
    // Check if user is logged in
    let user = firebase.auth().currentUser;
    console.log(user);
    // If no user is logged in, give message sender the temporary anonymous uid
    if (user === null) {
      userUid = 'NcOkdFWgetXu5JGifo9riUbYAyp1';
      console.log("User is signed in as anonymous: " + userUid);
      sendMessage(userUid, contactName, contactEmail, contactMessage);
      // After message is sent sign anonymous out
      signOutAnonymous();

    } else if (user) {
      userUid = user.uid;
      console.log("User is signed in as: " + userUid);
      sendMessage(userUid, contactName, contactEmail, contactMessage);
    }


  });

});