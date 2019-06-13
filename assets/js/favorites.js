$(document).ready(function () {

  // Function to add user favorites to database
  $(document).on('click', '#blankHeartImage', function () {

    // Authorize current user
    var currentUserUid = firebase.auth().currentUser.uid;
    console.log(currentUserUid);

    // Grab the parent element of the clicked image
    var favoriteCollectionItem = $(this).parent();

    // Grab the information we want to store in the database
    var favoriteObject = favoriteCollectionItem[0].parentElement.children;
    var name = favoriteObject[0].innerHTML;
    var website = favoriteObject[0].href;
    var address = favoriteObject[1].innerHTML;
    var phoneNumber = favoriteObject[2].innerHTML;

    // Create a new favorite entry
    var addFavorite = {
      website: website,
      address: address,
      phoneNumber: phoneNumber
    };

    var updates = {};

    // retrieve and store images to display when favorited
    var state = $(this).attr("state");
    // Toggle between adding and removing favarites
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
  });



});