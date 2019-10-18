$(document).ready(function () {

  // Function to add user favorites to database
  $(document).on('click', '#blankHeartImage', function () {

    // Get current user uid
    var user = firebase.auth().currentUser;

    if (user === null) {
      // alert("Sign in or Register to save favorites.");
      alert("Sign in or register to save favorites!");
    } else {
      // Else fetch uid
      var currentUserUid = user.uid;

      // Grab favorited data from the DOM
      var favoriteCollectionItem = $(this).parent();
      var favoriteCuisine = favoriteCollectionItem[0].offsetParent.offsetParent.firstElementChild.childNodes[0].innerText;
      var favoriteObject = favoriteCollectionItem[0].parentElement.children;
      // Remove unwanted characters from restaurant name. The name of the restaurant is used as a firebase key, and sometimes contains an invalid character. Keys must be non-empty strings and can't contain . # $ / [ ]
      var name = favoriteObject[0].innerHTML;
      name = name.replace(/[.#$\/\\]/g, "");
      var website = favoriteObject[0].href;
      var address = favoriteObject[1].innerHTML;
      var phoneNumber = favoriteObject[2].innerHTML;

      // Create a new favorite entry
      var addFavorite = {
        name: name,
        website: website,
        address: address,
        phoneNumber: phoneNumber,
        cuisine: favoriteCuisine
      };

      // Create empty object to use
      var updates = {};

      // Retrieve favorited/unfavorited state of card to toggle
      var state = $(this).attr("state");
      // Toggle between adding and removing favorites
      if (state === "falseFavorite") {
        $(this).attr("src", $(this).attr("trueFavorite"));
        $(this).attr("state", "trueFavorite");
        // Path to save user favorite to use with firebase call
        updates['/users/' + currentUserUid + '/favorites/' + name] = addFavorite;
        // Save user favorite in firebase
        return firebase.database().ref().update(updates);
      } else if (state === "trueFavorite") {
        $(this).attr("src", $(this).attr("falseFavorite"));
        $(this).attr("state", "falseFavorite");
        // Remove favorite from database
        return firebase.database().ref('/users/' + currentUserUid + '/favorites/' + name).remove();
      }
    }

  });

});