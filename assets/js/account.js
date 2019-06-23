$(document).ready(function () {

  function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {

      if (user) {
        // User is signed in.
        let email = user.email;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        console.log(user);
        console.log(email, isAnonymous, uid);
        getFavorites(uid);
      } else {
        console.log("No user is signed in.");
      }
    });

  }

  initApp();

  // Function to create favorite cards
  function createFavoriteCards(favorites) {
    // Add appropriate image
    let cuisineImage;
    switch (favorites.cuisine) {
      case 'Mexican':
        cuisineImage = './assets/images/mexican1.jpg';
        break;
      case 'American':
        cuisineImage = './assets/images/american2.jpg';
        break;
      case 'Pizza':
        cuisineImage = './assets/images/pizza.jpg';
        break;
      case 'Ethiopian/Eritrean':
        cuisineImage = './assets/images/ethiopian.jpg';
        break;
      case 'Eclectic (Varied)':
        cuisineImage = './assets/images/eclectic.png';
        break;
      case 'Macrobiotic':
        cuisineImage = './assets/images/macrobiotic.jpg';
        break;
      case 'Chinese':
        cuisineImage = './assets/images/chinese.jpg';
        break;
      case 'European':
        cuisineImage = './assets/images/european1.jpg';
        break;
      case 'Tex-Mex':
        cuisineImage = './assets/images/tex-mex.jpg';
        break;
      case 'Indian':
        cuisineImage = './assets/images/indian.jpg';
        break;
      case 'Italian':
        cuisineImage = './assets/images/italian.jpg';
        break;
      case 'Tibetan':
        cuisineImage = './assets/images/tibetan.jpg';
        break;
      case 'Mongolian':
        cuisineImage = './assets/images/mongolian.jpg';
        break;
      case 'Indonesian':
        cuisineImage = './assets/images/indonesian.jpg';
        break;
      case 'Mediterranean':
        cuisineImage = './assets/images/mediterranean2.jpg';
        break;
      case 'Korean':
        cuisineImage = './assets/images/korean.jpg';
        break;
      case 'Indian (Southern)':
        cuisineImage = './assets/images/indiansouthern.jpg';
        break;
      case 'Middle Eastern/Persian':
        cuisineImage = './assets/images/middleeastern.jpg';
        break;
      case 'Vietnamese':
        cuisineImage = './assets/images/vietnamese.jpg';
        break;
      case 'Szechuan':
        cuisineImage = './assets/images/szechuan.jpg';
        break;
      case 'Greek':
        cuisineImage = './assets/images/greek.jpg';
        break;
      case 'Thai':
        cuisineImage = './assets/images/thai.jpg';
        break;
      case 'African':
        cuisineImage = './assets/images/african1.jpg';
        break;
      default:
        console.log('Sorry, we dont have ' + favorites.cuisine + ' in our system yet.');
        cuisineImage = './assets/images/vegetarian1.jpg';
    }

    // Build card using jQuery
    let favoriteCardElement = $("<div>").addClass("col s12 m6 l4 size-med")
      .append($("<div>").addClass("card")
        .append($("<div>").addClass("card-image")
          .append($("<img>").attr("src", cuisineImage).attr("alt", "Image of cuisine type"))
          .append($("<span>").addClass("card-title").text(favorites.name))
        )
        .append($("<div>").addClass("card-content")
          .append($("<p>").text("Phone: " + favorites.phoneNumber))
          .append($("<p>").text("Address: " + favorites.address))
          .append($("<a>")
            .append($("<img>").attr("id", "redheart").attr("src", "assets/images/redheart.png"))
          )
        )
        .append($("<div>").addClass("card-action").attr("style", "overflow-wrap:break-word")
          .append($("<a>").attr("href", favorites.website).attr("style", "text-transform:none").text(favorites.website))
        )
      )
    // Append the created cards
    $("#favorites").append(favoriteCardElement);
  }

  // Function that fetches user data 
  function getFavorites(userId) {
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


  // This creates two variables: storageService is a reference to firebase storage service — it allows you to use all of the methods they make available for storing data and files.
  const storageService = firebase.storage();
  // The second, storageRef is a reference to your actual instantiation of that service — it will lead you to your specific database and root file location where things get uploaded.
  const storageRef = storageService.ref();

  let selectedFile;


  function handleFileUploadChange(e) {
    selectedFile = e.target.file[0];
  }

  function handleFileUploadSubmit(e) {
    //create a child directory called images, and place the file inside this directory
    const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); 
    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    }, () => {
      // Do something once upload is complete
      console.log('success');
    });
  }

  $(document).on('change', '.file-select', function (e) {
    handleFileUploadChange(e);
  });

  $(document).on('click', '.file-submit', function (e) {
    handleFileUploadSubmit(e);
  })

  // Function to update user favorites 
  $(document).on('click', '#redheart', function () {
    // Get userId
    let userId = firebase.auth().currentUser.uid;
    // Grab the elememt user wants deleted
    let favoriteItem = $(this).parent();
    let keyToRemove = favoriteItem[0].offsetParent.childNodes[0].innerText;

    // Remove favorite from database
    return firebase.database().ref('/users/' + userId + '/favorites/' + keyToRemove).remove()
      .then(function () {
        // Hide card
        let cardToBeRemoved = favoriteItem[0].parentElement.parentElement.parentElement;
        $(cardToBeRemoved).attr("style", "display:none");
      });
  });


});