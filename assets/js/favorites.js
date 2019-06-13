$(document).ready(function () {

  // Function to add user favorites to database
  $(document).on('click', '#blankHeartImage', function () {

    console.log("Added to favorites!");
    // Grab the parent element of the clicked image
    var favoriteCollectionItem = $(this).parent();
    console.log(favoriteCollectionItem);
    // Grab the information we want to store in the database
    var favoriteObject = favoriteCollectionItem[0].parentElement.children;
    console.log(favoriteObject);
    var name = favoriteObject[0].innerHTML;
    console.log(name);
    var website = favoriteObject[0].href;
    console.log(website);
    var address = favoriteObject[1].innerHTML;
    console.log(address);
    var phoneNumber = favoriteObject[2].innerHTML;
    console.log(phoneNumber);
    // Authorize current user
    var currentUserUid = firebase.auth().currentUser.uid;
    console.log(currentUserUid);

    // Create a new favorite entry
    var addFavorite = {
      name: name,
      website: website,
      address: address,
      phoneNumber: phoneNumber
    };

    // Get a key for a new favorite entry
    var newFavoriteKey = firebase.database().ref().child('favorites').push().key;
    // Write the new post's data under users
    var updates = {};
    updates['/users/' + currentUserUid + '/favorites/' + newFavoriteKey] = addFavorite;

    return firebase.database().ref().update(updates);




  });















});