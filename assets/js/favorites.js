$(document).ready(function () {

  // Function to add user favorites to database
  $(document).on('click', '#blankHeartImage', function () {

    // Get current user uid
    let user = firebase.auth().currentUser;

    if (user === null) {
      // alert("Sign in or Register to save favorites.");
      alert("Sign in or register to save favorites!");
    } else {

      let currentUserUid = user.uid;

      // Grab the parent element of the clicked image
      let favoriteCollectionItem = $(this).parent();
      // Grab the favorite cuisine
      let favoriteCuisine = favoriteCollectionItem[0].offsetParent.offsetParent.firstElementChild.childNodes[0].innerText;
      // Grab the information we want to store in the database
      let favoriteObject = favoriteCollectionItem[0].parentElement.children;
      let name = favoriteObject[0].innerHTML;
      // Name of restaurant sometime contains an invalid key in the path. Keys must be non-empty strings and can't contain . # $ / [ ]
      // Remove unwanted characters
      name = name.replace(/[.#$\/\\]/g, "");
      let website = favoriteObject[0].href;
      let address = favoriteObject[1].innerHTML;
      let phoneNumber = favoriteObject[2].innerHTML;

      // Create a new favorite entry
      let addFavorite = {
        name: name,
        website: website,
        address: address,
        phoneNumber: phoneNumber,
        cuisine: favoriteCuisine
      };

      let updates = {};

      // retrieve and store images to display when favorited
      let state = $(this).attr("state");
      // Toggle between adding and removing favorites
      if (state === "falseFavorite") {
        $(this).attr("src", $(this).attr("trueFavorite"));
        $(this).attr("state", "trueFavorite");
        // Path to save user favorite
        updates['/users/' + currentUserUid + '/favorites/' + name] = addFavorite;
        // Save user favorite
        return firebase.database().ref().update(updates);
      } else if (state === "trueFavorite") {
        $(this).attr("src", $(this).attr("falseFavorite"));
        $(this).attr("state", "falseFavorite");
        // Remove favorite 
        return firebase.database().ref('/users/' + currentUserUid + '/favorites/' + name).remove();
      }

    }

  });


});