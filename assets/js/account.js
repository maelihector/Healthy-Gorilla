$(document).ready(function () {

  // Check if user is logged in
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      getFavorites(user);
      return user;
    } else {
      console.log("User is not signed in!")
      // If User is not signed in maybe use session storage instead?
      // If no favorites in session, text("You haven't favorited anything yet")
    }
  });

  // Function to create favorite cards
  function createFavoriteCards(favorites) {
    // Build card using jQuery
    let favoriteCardElement = $("<div>").addClass("col s12 m6 l4")
      .append($("<div>").addClass("card")
        .append($("<div>").addClass("card-image")
          .append($("<img>").attr("src", "./assets/images/pizza.jpg"))
          .append($("<span>").addClass("card-title").text(favorites.name))
        )
        .append($("<div>").addClass("card-content")
          .append($("<p>").text("Phone: " + favorites.phoneNumber))
          .append($("<p>").text("Address: " + favorites.address))
          .append($("<a>")
            .append($("<img>").attr("id", "redheart").attr("src", "assets/images/redheart.png"))
          )
        )
        .append($("<div>").addClass("card-action").attr("style", "overflow:scroll")
          .append($("<a>").attr("href", favorites.website).attr("style", "text-transform:none").text(favorites.website))
        )
      )
    // Append the created cards
    $("#favorites").append(favoriteCardElement);
  }

  // Function that fetches user data 
  function getFavorites(user) {
    let userId = user.uid;
    // Call firebase database to get user's data
    return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
      cards = [];
      // Grab favorites data
      let favorites = snapshot.val().favorites;
      // Loop through favorites object 
      for (let i in favorites) {
        // Call crateFavoriteCards to create card for each favorite
        createFavoriteCards(favorites[i]);
      }
    });
  }

  // Function to update user favorites 
  $(document).on('click', '#redheart', function () {
    // Get userId
    var userId = firebase.auth().currentUser.uid;
    // Grab the elememt user wants deleted
    let favoriteItem = $(this).parent();
    favoriteItem = favoriteItem[0].offsetParent.childNodes[0].innerText;

    // Remove favorite from database
    return firebase.database().ref('/users/' + userId + '/favorites/' + favoriteItem).remove()
    .then(function() {
      // Reload page so favorites can update
      location.reload(true);
    });
  });


});