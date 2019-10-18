$(document).ready(function () {

  // Function to push user contact message to firebase
  function sendMessage(user, contactName, contactEmail, contactMessage) {

    // Create entry
    var newMessage = {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
      user: user
    };

    // POST user message to firebase
    return firebase.database().ref('/messages/').push(newMessage);

  }

  // If a non-signed in user sends a message through the contact page, an annonymous uid is temporarily given to the user
  // Function to sign out anonymous user after message has been sent
  function signOutAnonymous() {
    firebase.auth().signOut().then(function () {
      // Clear absolutely everything stored in localStorage using localStorage.clear()
      localStorage.clear();

    });
  }

  // Function event to call sendMessage() function with appropriate user uid (user or anonymous)
  $(document).on('click', '#sendMessage', function () {
    // Grab message values
    var contactName = $("#contact-name").val();
    var contactEmail = $("#contact-email").val();
    var contactMessage = $("#contact-message").val();

    var userUid;

    // Check if user is logged in
    var user = firebase.auth().currentUser;

    // If no user is logged in, give message sender the temporary anonymous uid
    if (user === null) {
      userUid = 'NcOkdFWgetXu5JGifo9riUbYAyp1';
      sendMessage(userUid, contactName, contactEmail, contactMessage);
      // After message is sent sign anonymous out
      signOutAnonymous();

      // Else if user is signed in, use their uid to send message
    } else if (user) {
      userUid = user.uid;
      sendMessage(userUid, contactName, contactEmail, contactMessage);
    }

  });

});