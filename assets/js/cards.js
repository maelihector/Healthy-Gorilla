// Function to create cards to dump vegguide data
function createCard(cuisine, restaurants) {

  let cardElem = $("<div>").addClass("col s12 m6")
    .append($("<div>").addClass("card")
      .append($("<div>").addClass("card-content")
        .append($("<span>").addClass("card-title").text(cuisine))
        .append($("<div>").addClass("collection"))
      )
    )
  restaurants.forEach((value, index) => {
    cardElem.find(".collection")
      .append($("<div>").addClass("collection-item")
        .append($("<a>").attr("href", value.website).attr("target", "_blank").text(value.name))
        .append("<p>" + value.address1 + "</p>")
        .append("<p>" + value.phone + "</p>")
        .append('<a><img id="blankHeartImage" src="assets/images/heart.png" falseFavorite="assets/images/heart.png" trueFavorite="assets/images/redheart.png" state="falseFavorite"/></a>')
      )
  })
  $("#cardDiv").append(cardElem);
}


function codeAddress() {
  var geocoder = new google.maps.Geocoder();
  // Grab user's zipcode when submitted
  var address = $("#zipcode").val();
  // Find lat and long of zipcode using geocoder to send to vegguide query
  geocoder.geocode({
    'address': address
  }, function (results, status) {
    if (status == 'OK') {
      lat = results[0].geometry.location.lat();
      lng = results[0].geometry.location.lng();
      var input = lat + "," + lng;
      // Query vegguide using user lat and long
      var queryURL = "https://www.vegguide.org/search/by-lat-long/" + input + "/filter/distance=3;category_id=1;veg_level=2";
      // Get vegguide results and loop through them to seperate by restaurant and cuisine
      $.get(queryURL).then(function (res) {
        if (res.entry_count === 0) {
          alert("Sorry, didn't find any restaurant results at " + address + " zip code.");
        }
        cuisines = [];
        for (let i in res.entries) {
          for (let j in res.entries[i].cuisines) {
            cuisines.push(res.entries[i].cuisines[j]);
          }
          cuisines = $.unique(cuisines);
        }
        restaurants = [];
        for (let r in res.entries) {
          for (let c in cuisines) {
            if (!(cuisines[c] in restaurants)) {
              restaurants[cuisines[c]] = [];
            }
            if (res.entries[r].cuisines.includes(cuisines[c])) {
              restaurants[cuisines[c]].push(res.entries[r]);
            }
            restaurants[cuisines[c]] = $.unique(restaurants[cuisines[c]]);
          }
        }
        // Create a card for each cuisine returned lisiting appropriate restaurants
        for (cuisine in restaurants) {
          createCard(cuisine, restaurants[cuisine]);
        }
      })
    }
  })
}

// Validate zipcode
function validateZip() {
  var zipcodeLength = $("#zipcode").val();
  zipcodeLength = zipcodeLength.length;

  if (zipcodeLength !== 5) {
    alert("Pease enter 5 digits.");
    return false;
  } else {
    return true;
  }
}

// Onclick event to trigger codeAddress()
$("#enterButton").click(function (e) {
  e.preventDefault();
  if (validateZip() === false) {
    return false;
  }
  codeAddress();
  $('#after-hero').removeClass('after-hero');
  $('html, body').animate({
    scrollTop: $("#cardDiv").offset().top
  }, 2000);
});

// Keypress Enter event to trigger codeAddress()
$("#zipcode").keypress(function (event) {
  if (event.which === 13) {
    event.preventDefault();
    if (validateZip() === false) {
      return false;
    }
    codeAddress();
    $('#after-hero').removeClass('after-hero');
    $('html, body').animate({
      scrollTop: $("#cardDiv").offset().top
    }, 2000);
  }
});