// $(document).ready(function(){

function createCard(cuisine, restaurants) {

	let cardElem = $("<div>")
		.addClass("col s12 m6")
		.append(
			$("<div>")
			.addClass("card")
			.append(
				$("<div>")
				.addClass("card-content")
				.append(
					$("<span>")
					.addClass("card-title")
					.text(cuisine)
				).append(
					$("<div>")
					.addClass("collection")
				)
			)
		)

	restaurants.forEach((value, index) => {
		cardElem.find(".collection")
			.append(
				$("<a>")
				.attr("href", value.website)
				.text(value.name)
				.append("<p>", value.address1)
				.append("<p>", value.phone)
				.addClass("collection-item")
				.attr("target", "_blank")
				.append('<a><img id="theImg" src="assets/images/heart.png"/></a>')
			)

	})


	$("#cardDiv").append(cardElem);
}


var geocoder;
var map;

function initMap() {
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(30.2672, -97.7431);
	var mapOptions = {
		zoom: 13,
		center: latlng
	};
}


function codeAddress() {

	var address = $("#zipcode").val();

	geocoder.geocode({
		'address': address
	}, function (results, status) {
		if (status == 'OK') {
			lat = results[0].geometry.location.lat();
			lng = results[0].geometry.location.lng();
			var input = lat + "," + lng;

			var queryURL = "https://www.vegguide.org/search/by-lat-long/" + input + "/filter/category_id=1;veg_level=2";
			// var queryURL = "https://www.vegguide.org/search/by-lat-long/30.2672,-97.7431/filter/category_id=1;veg_level=2";


			$.get(queryURL).then(function (res) {
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

				for (cuisine in restaurants) {
					createCard(cuisine, restaurants[cuisine]);
				}

				console.log(restaurants);
				console.log(restaurants[cuisines[0]]);

			})


			// else {
			// 	alert('Geocode was not successful for the following reason: ' + status);
			// }
		}
	})
}
// })
$("#enterButton").on("click", codeAddress);

$("#theImg").on("click", function () {
	alert("Added to favorites!")
});