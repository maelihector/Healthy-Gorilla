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
          .append($("<ul>").addClass("restInfo")
            .append($("<li>").text("Phone: " + favorites.phoneNumber))
            .append($("<li>").text("Address: " + favorites.address))
            .append($("<li>").text("Website: ")
              .append($("<a>").attr("href", favorites.website).text(favorites.website))
            )
          )
        )
      )
    // Find id="favorites" on the DOM and append the created cards
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


});