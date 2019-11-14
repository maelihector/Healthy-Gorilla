# Healthy Gorilla | HG

## What is Healthy Gorilla

Healthy Gorilla is a Restaurant Finder Application that takes a zip code input and retrieves nearby vegetarian restaurants for the user. 

Healthy Gorilla also allows for logged-in users to save a list of their favorite restaurants to their account. 

## How does Healthy Gorilla work?

Along with [Firebase Authentication and Realtime Database](https://firebase.google.com/) to authenticate users and to host restaurant data, our application uses [Google Maps Geocode API](https://developers.google.com/maps/documentation/geocoding/start) to retrieve the latitude and longitude of the user's zip code, which are then used to query the [Vegguide API](https://www.vegguide.org/)  which sends information about restaurants within a 3-mile radius.

## What does Healthy Gorilla do?

- Healthy Gorilla allows for users to search for location-based vegetarian restaurants by inputting any U.S. zip code to the application.

-  The user has the option to sign in or register if they wish to save any restaurant data for later use.

- Healthy Gorilla creates cuisine cards for Vegguide's returned restaurants, and within those cuisine cards individual restaurant cards each with the restaurant's contact information. 

- Users can favorite any restaurant by simply clicking on the card's heart icon.
	- When a logged in a user can see a list of their favorites restaurant cards by going to the `My Favorites` page.
	- The user can re-click on the heart icon to un-save the restaurant card at either at the `Home` page, or in the `My Favorites` page.

- Healthy Gorilla also allows for authorized users and visitors to send messages to the developers via the `Contact Us` page. 

## Future Developments

We have a lot in mind. We want to:

1. Allow for users to set the *vegetarian level* of their search:

				1  - mostly vegetarian, but not always
				2  - vegetarian
				3  - vegan

	currently this level is automatically set to 2.

2. Add the option of viewing a map of each restaurant's location.
3. Add other Vegguide data to cards, like reviews, photos and how expensive it is.
4. Add a feature that allow users to connect and plan lunch meetups at the listed restaurants for the purpose of getting with like-minded folks to help them stay on-track.
5. Add more user profile options.

## Why was Healthy Gorilla made?

To assist in finding *actual* vegetarian restaurants. 

[Healthy Gorilla | HG](https://healthygorilla.web.app/index.html) is not only for the respective [5% & 3%](https://news.gallup.com/poll/238328/snapshot-few-americans-vegetarian-vegan.aspx?g_source=link_NEWSV9&g_medium=NEWSFEED&g_campaign=item_&g_content=Snapshot%3a%2520Few%2520Americans%2520Vegetarian%2520or%2520Vegan) of vegetarians and vegans out there. The application is also for the person who tells themselves that they’re going to *try* to eat vegetarian or vegan food for a period of time. We'll call these people **experimenters**, and they are trying this for several different reasons; for their health, for ethical reasons, to help better understand their vegan or vegetarian friend, or to simply challenge themselves. Whatever the reason, they need a surefire way to get a great list of potential restaurants.

When **experimenters** search for restaurants that will keep them from temptation, they find that the algorithms linked to them would rather steer them *towards* it. What happens is that they search their favorite restaurant finder with the keywords 'vegetarian,' 'vegan,' or the formers with 'friendly' attached after it, and more likely than not they get nothing good, or worse, they get some sponsored restaurant advertising with a photo of some delicious-looking prepared animal product. And yes, although they do find *some* restaurant finders that return a lot of searches, about **1/3** of their top results are actually misleading or down right wrong.

The truth is, that because vegans, vegetarians, and **experimenters** are so few in numbers, restaurant finders don’t care to cater to them.

[Healthy Gorilla | HG](https://healthygorilla.web.app/index.html) is attempting to change that.

## Technologies Used

HTML

[Materializecss](http://materializecss.com)

JavaScript

[jQuery](https://jquery.com/)

[Firebase Realtime Database & Authentication](https://firebase.google.com/)

[Vegguide API](https://www.vegguide.org/site/api-docs)

[Google Maps Geocode API](https://developers.google.com/maps/documentation/geocoding/start) 


## Authors

* **[Maeli Hector](https://github.com/maelihector)** - *Authentication/Firebase/JavaScript/HTML/CSS*

* **[Kat Thompson](https://github.com/thompsonkathryne)** - *Authentication/Google Geocoding*

* **[Mike Hong](https://github.com/mikehong123)** - *HTML/CSS*

* **[Sam Hicks](https://github.com/toatsted)** - *JavaScript*
---
### Credits

[Gallup](news.gallup.com) stats on U.S. vegans and vegetarians.

[Unsplash](https://unsplash.com/) food images.

### Website maintained by [Maeli Hector](https://github.com/maelihector)

> Written by Maeli Hector with [StackEdit](https://stackedit.io/)