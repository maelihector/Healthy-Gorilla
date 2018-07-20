// Add Firebase to HealthyGorillaApp web app
var config = {
    apiKey: "AIzaSyBQ7V0lYt55JHMgDycyY4EO3bQuQRQz-Hw",
    authDomain: "healthygorillaapp.firebaseapp.com",
    databaseURL: "https://healthygorillaapp.firebaseio.com",
    projectId: "healthygorillaapp",
    storageBucket: "healthygorillaapp.appspot.com",
    messagingSenderId: "711127676527"
};
firebase.initializeApp(config);

// Firebase variables
var database = firebase.database();
var user;
var ref = firebase.database().ref();
var userId = JSON.parse(localStorage.getItem("UID"));

// Console log the current user
console.log("The current UID is: " + userId);

ref.on("value", function(snapshot) {
}, function (error) {
console.log("Error: " + error.code);
});

var refId = firebase.database().ref("users/" + userId);

// Create a new user
$("#register-btn").on("click", function(){
    var email = $("#register_email").val().trim();
    var password = $("#register_password").val().trim();
    var displayName = $("#register_name").val().trim();
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user){
        return user.updateProfile({
            displayName: displayName
        });
    }).then(
        $( '#register-form' ).each(function(){
        this.reset();
    })).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        return;
    });

    isLoggedIn();

});


// Login existing user
$("#login-btn").on("click", function(){
    var email = $("#login_email").val().trim();
    var password = $("#login_password").val().trim();
    var user = firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
        if(error.code === "auth/invalid-email"){
        $('#login-modal').modal('open');
        alert("Incorrect email format.");
        console.log(error.code);
        console.log(error.message);
        return;
        }
        if(error.code === "auth/user-not-found"){
        $('#login-modal').modal('open');
        alert("Invalid email or password");
        console.log(error.code);
        console.log(error.message);
        return;
        }else{
        $('#login-modal').modal('close');
        }
        
    });

    isLoggedIn();

});


// Allow users to sign out. 
$("#signOutBtn").on("click", function(){
    firebase.auth().signOut().then(function() {
        console.log("Logged out!")
        localStorage.removeItem('UID');
        isLoggedIn();

    }, function(error) {
        console.log(error.code);
        console.log(error.message);
    });
	});


function isLoggedIn(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        console.log("User is logged in.");
            user = firebase.auth().currentUser;
            userId = firebase.auth().currentUser.uid;
            localStorage.setItem("UID", JSON.stringify(userId));
                console.log(user);
                console.log(user.displayName);
                console.log(userId);
                $("#helloName").show();
                $("#helloName").html("Hello, " + user.displayName + "!");
                $("#signInBtn").hide();
                $("#signOutBtn").show();
        } else {
        $("#signInBtn").show();
        $("#signOutBtn").hide();
        $("#helloName").empty();
        $("#helloName").hide();
        console.log("No user logged in!");
        }
    });
}
 
$(function() {
    
    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    $("form").submit(function () {
        switch(this.id) {
            case "login-form":
                var $lg_email=$('#login_email').val();
                var $lg_password=$('#login_password').val();
                if ($lg_email == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }
                return false;
                break;
            case "lost-form":
                var $ls_email=$('#lost_email').val();
                if ($ls_email == "ERROR") {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
                } else {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
                }
                return false;
                break;
            case "register-form":
                // var $rg_name=$('#register_name').val();
                var $rg_email=$('#register_email').val();
                var $rg_password=$('#register_password').val();
                if ($rg_email == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                } else {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
                }
                return false;
                break;
            default:
                return false;
        }
        return false;
    });
    
    $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
    $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
    $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
    $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
    $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
    $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });
    
    function modalAnimate ($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height",$oldH);
        $oldForm.fadeToggle($modalAnimateTime, function(){
            $divForms.animate({height: $newH}, $modalAnimateTime, function(){
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }
    
    function msgFade ($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }
    
    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
  		}, $msgShowTime);
    }
});




// $("#addInfoBtn").on("click", function(evt){
// 	evt.preventDefault();

// 	 var userFirstName = $("#firstNameInput").val().trim();
// 	 var userLastName = $("#lastNameInput").val().trim();
// 	 var userAddress = $("#addressInput").val().trim();
// 	 var userPhone = $("#phoneNumberInput").val().trim();
// 	 var userEmail = $("#emailInput").val().trim();
// 	 var modified = new Date();
// 	 userId = JSON.parse(localStorage.getItem("UID"));
// 	 console.log(userFirstName);
// 	 console.log(userLastName);
// 	 console.log(userAddress);
// 	 console.log(userPhone);
// 	 console.log(userEmail);
// 	 console.log(modified);
// 	 console.log(userId);

// 	 var acctInfo = {
// 	 		userId: userId,
// 		    firstName: userFirstName,
// 		    lastName: userLastName,
// 		    address: userAddress,
// 		    phone: userPhone,
// 		    email: userEmail,
// 		    lastModified: modified
// 	 };

// 	 if(userId === null){
// 	 	alert("You do not have an account!");
// 	 	 userFirstName = $("#firstNameInput").val("");
// 		 userLastName = $("#lastNameInput").val("");
// 		 userAddress = $("#addressInput").val("");
// 		 userPhone = $("#phoneNumberInput").val("");
// 		 userEmail = $("#emailInput").val("");
// 	 	return;
// 	 }
	 	

// 	 database.ref('users/' + userId).update(acctInfo);
// 	 userFirstName = $("#firstNameInput").val("");
// 	 userLastName = $("#lastNameInput").val("");
// 	 userAddress = $("#addressInput").val("");
// 	 userPhone = $("#phoneNumberInput").val("");
// 	 userEmail = $("#emailInput").val("");
// 	 alert("You updated your account information!");



// 	 appendToHTML();
// });


// function appendToHTML(){
// 		var userDataRef = firebase.database().ref("users/" + userId).orderByKey();
// 		userDataRef.once("value").then(function(snapshot) {
// 		snapshot.forEach(function(childSnapshot) {
// 		  var key = childSnapshot.key;
// 		  // console.log(key);
// 		  var childData = childSnapshot.val();              
// 		  console.log(key + ": " + childData);
// 		  // var name_val = childSnapshot.val().firstName;
// 		  // console.log(name_val);
// 		  // var id_val = childSnapshot.val().lastName;
// 		  // console.log(id_val);
	
// 		  // $("#name").append(name_val);
// 		  // $("#id").append(id_val);

// 		  });
// 		});

// 		hideForm();
	
// 	}

// function hideForm(){
// 	$("#update_account").hide();
// }

// function showForm(){
// 	$("#update_account").show();
// }