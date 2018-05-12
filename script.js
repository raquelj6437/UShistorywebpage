$('#loginPage').hide()
$('#intro-2').hide()
$('#signUpPage').hide()
// $('#intro-1').hide()
$('#commentsection').hide()

$('.periods').hide()

$(".timelineimg").click(function() {
    $('.periods').hide()
    var value = $(this).attr('id')
    value = value.replace('period', '')
    value = value.replace('Image', '')
    $('#period' + value).show()
});

$("#login").click(function() {
    $('#loginPage').show()
    $('#intro-1').hide()
    $('#intro-2').hide()
});

// $("#signUp").click(function() {
//     $('#signUpPage').show()
//     $('#intro-1').hide()
//     $('#intro-2').hide()
// });

$("#APButton").click(function() {
    $('#intro-2').show()
});

$("#logout").click(function() {
    $('#login').show()
    $('#commentsection').hide()
});

$("a").on('click', function(event) {
    if (this.hash !== "") {
     var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD2DtL08N6-HfYbUA42CgaB_selDghvkyo",
    authDomain: "us-history-1524785849679.firebaseapp.com",
    databaseURL: "https://us-history-1524785849679.firebaseio.com",
    projectId: "us-history-1524785849679",
    storageBucket: "us-history-1524785849679.appspot.com",
    messagingSenderId: "746157019230"
};
firebase.initializeApp(config);

//google and firebase
function login() {
    function newLogin(user) {
        if (user) {
            app(user);
        }
        else {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }
    }
    var auth = firebase.auth();
    auth.onAuthStateChanged(newLogin);
}

function app(user) {
    var username = user.displayName
    //user.displayName
    //user.email
    //user.photoURL
    //user.iud

    $(".name").text(user.displayName)
    // $("#image").attr("src",user.photoURL)

    $("#commentSubmit").click(function() {
        var comment = $("#comment").val();
        writeCommentData(comment, username)
    });
}

$("#googlelogin").click(function() {
    login()
    $('.logButton').hide()
    $('#intro-1').show()
    $('#commentsection').show()
    // $('#loginPage').hide()
    $('#signUpPage').hide()
    $('#loginPage').hide()
    $('#intro-2').show()
    alert(user.displayName + ' you are logged in!')
    window.location.hash = '#intro-1';
});

$("#logout").click(function() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }, function(error) {
        // An error happened.
    });
});


function writeCommentData(comment, username) {
    firebase.database().ref('comment/').push().set({
        comment: comment,
        username: username
    })
}


var count = 0

function appendComment() {
    $('.commentRemove').empty()
    var query = firebase.database().ref('comment/').orderByKey();
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                var objects = Object.values(childData)
                $('.commentRemove:last').prepend($("<div class='panel panel-default' id='newComment'><div class='panel-heading' id='username'></div><div class='panel-body' id='userComment'></div></div>"));

                $("#username").append(objects[1])
                $("#userComment").append(objects[0])

                var value = objects[0]
                var colors = [/red/, /green/, /purple/, /orange/, /yellow/, /turquiose/, /violet/, /blue/]

                for (var i = 0; i < colors.length; i++) {
                    if (colors[i].test(value) == true) {
                        var word = String(colors[i])
                        word = word.replace(/\//g, '');
                        $('#userComment').css("color", word)
                    }
                }
            });
        });
}

$("#commentSubmit").click(function() {
    appendComment()
});

appendComment()

window.setInterval(function() {
    appendComment()
}, 5000);

// function writeUserData(firstName, lastName, username, password, email) {
//     firebase.database().ref('user/').push().set({
//         firstName: firstName,
//         lastName: lastName,
//         username: username,
//         password: password,
//         email: email
//     })
// }

// $("#signUpButton").click(function() {
//     var firstName = $("#firstName").val();
//     var lastName = $("#lastName").val();
//     var username = $("#username").val();
//     var password = $("#password").val();
//     var email = $("#email").val();

//     if (firstName == !'' && lastName == !'' && username == !'' && password == !'' && email == !'') {
//         writeUserData(firstName, lastName, username, password, email)
//     }
//     else {
//         alert('please fill in everything')
//     }
// });


// $("#signIn").click(function() {
//     var userVal = $("#oldUser").val();
//     var userValPass = $("#oldUserPass").val();
//     var query = firebase.database().ref('user/').orderByKey();
//     query.once("value")
//         .then(function(snapshot) {
//             snapshot.forEach(function(childSnapshot) {
//                 var childData = childSnapshot.val();
//                 var objects = Object.values(childData)

//                 var userVal = $("#oldUser").val();
//                 var userValPass = $("#oldUserPass").val();
//                 if (userVal == objects[4] && userValPass == objects[3]) {
//                     window.location.hash = '#intro-1';
//                     $('#intro-1').show()
//                     $('#loginPage').hide()
//                     $('.logButton').hide()
//                     userVal = $("#oldUser").val('');
//                     userValPass = $("#oldUserPass").val('');
//                     $("#wrongUserPass").text("");
//                 }
//                 else {
//                     $("#wrongUserPass").text("wrong username or password");
//                 }
//             });
//         });
// });