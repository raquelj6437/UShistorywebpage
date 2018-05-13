$('#loginPage').hide()
// $('#intro-2').hide()
$('#signUpPage').hide()
$('#intro-1').hide()
$('#commentsection').hide()

$('.periods').hide()

$(document).on('click', '#timeline .timelineimg', function(){ 
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

$("#signUp").click(function() {
    $('#signUpPage').show()
    $('#intro-1').hide()
    $('#intro-2').hide()
});

$("#APButton").click(function() {
    $('#intro-2').show()
});

$("#logout").click(function() {
    $('#login').show()
    $('#commentsection').hide()
});

$(document).on('click', 'a', function(e) {
    e.preventDefault();                   // prevent default anchor behavior
    setTimeout(function(){

    },500);       
}); 

$(document).on('click', 'a', function(){
        if (this.hash !== "") {
         var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
            window.location.hash = hash;
          });
        }
  });

$('#commentButton').click (function () {
   setTimeout(function () {
       window.location.href = "#commentCollapse"; //will redirect to your blog page (an ex: blog.html)
    }, 500); //will call the function after 2 secs.
});

//google and firebase
function commentData(comment, username){
    var comment = $("#comment").val();
    writeCommentData(comment, username)
}

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
        commentData(comment, username)
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
                $('.commentRemove:last').prepend($("<div class='card' id='newComment'> <div class='card-header'><span id='username'></span></div> <div class='card-text' id='userComment'></div><button id='replyButton'>reply</button></div><br>"));

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

function writeUserData(firstName, lastName, username, password, email) {
    firebase.database().ref('user/').push().set({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        email: email
    })
}

$("#signUpButton").click(function() {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var username = $("#username1").val();
    var password = $("#password").val();
    var email = $("#email").val();

    if (firstName == !'' && lastName == !'' && username == !'' && password == !'' && email == !'') {
        writeUserData(firstName, lastName, username, password, email)
    }
    else {
        alert('please fill in everything')
    }
});

var name = ''

$("#signIn").click(function() {
    console.log('hi')
    var userVal = $("#oldUser").val();
    var userValPass = $("#oldUserPass").val();
    var query = firebase.database().ref('user/').orderByKey();
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                console.log(childData.firstName)

                var userVal = $("#oldUser").val();
                var userValPass = $("#oldUserPass").val();
                if (userVal == childData.username && userValPass == childData.password) {
                    window.location.hash = '#intro-1';
                    $('#intro-1').show()
                    $('#intro-2').show()
                    $('#loginPage').hide()
                    $('.logButton').hide()
                    $('#commentsection').show()
                    userVal = $("#oldUser").val('');
                    userValPass = $("#oldUserPass").val('');
                    $("#wrongUserPass").text("");
                    name = childData.firstName + ' ' + childData.lastName
                    $(".name").text(name)
                }
                else {
                    $("#wrongUserPass").text("wrong username or password");
                }
            });
        });
});

$("#commentSubmit").click(function() {
    commentData(comment, name)
});

// timeline jquey
function checkSize(){
    if ($(".vocabName").css("padding-top") == "460px" ){
        $("#timeline").html("<p id='timelineTitle'>Timeline</p> <div class='vl'></div><a href='#period1'><div class='timelineimg' id='period1Image'><img src='images/timeline/period1.jpg' alt='Period 1' class='img-circle'><p class='centered'><u>Period 1</u> <br>(1491 – 1607)</p></div></a><a href='#period2'><div class='timelineimg' id='period2Image'><img src='images/timeline/period2.jpg' alt='Period 2' class='img-circle'><p class='centered'><u>Period 2 </u><br> (1607-1754)</p></div></a><a href='#period3'><div class='timelineimg' id='period3Image'><img src='images/timeline/period3.jpg' alt='Period 3' class='img-circle'><p class='centered'><u>Period 3</u> <br> (1754-1800)</p></div></a><a href='#period4'><div class='timelineimg' id='period4Image'><img src='images/timeline/period4.jpg' alt='Period 4' class='img-circle'><p class='centered'><u>Period 4 </u><br> (1800-1848)</p></div></a><a href='#period5'><div class='timelineimg' id='period5Image'><img src='images/timeline/period5.jpg' alt='Period 5' class='img-circle'><p class='centered'><u>Period 5 </u><br>(1844-1877)</p></div></a><a href='#period6'><div class='timelineimg' id='period6Image'><img src='images/timeline/period6.jpg' alt='Period 6' class='img-circle'><p class='centered'><u>Period 6 </u><br>(1865-1898) </p></div></a><a href='#period7'><div class='timelineimg' id='period7Image'><img src='images/timeline/period7.jpg' alt='Period 7' class='img-circle'><p class='centered'><u>Period 7 </u><br>(1890–1945) </p></div></a><a href='#period8'><div class='timelineimg' id='period8Image'><img src='images/timeline/period8.jpg' alt='Period 8' class='img-circle'><p class='centered'><u>Period 8</u> <br> (1945-1980) </p></div></a>")
    }
    else if ($(".vocabName").css("padding-top") == "100px" ){
        $("#timeline").html("<div><div class='dropdown'><button type='button' id='timelineTitle' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' style='width:100%'>Timeline</button><div class='dropdown-menu' style='width:100%; text-align:center;'><div class='dropdown-item'><a href='#period1'><div class='timelineimg' id='period1Image'><p class='centered'><u>Period 1</u> (1491 – 1607)</p></div></a></div><div class='dropdown-divider'></div><div class='dropdown-item'><a href='#period2'><div class='timelineimg' id='period2Image'><p class='centered'><u>Period 2 </u> (1607-1754)</p></div></a></div><div class='dropdown-divider'></div><dvi class='dropdown-item'><a href='#period3'><div class='timelineimg' id='period3Image'><p class='centered'><u>Period 3</u> (1754-1800)</p></div></a></dvi><div class='dropdown-divider'></div><div class='dropdown-item'><a href='#period4'><div class='timelineimg' id='period4Image'><p class='centered'><u>Period 4 </u> (1800-1848)</p></div></a></div><div class='dropdown-divider'></div><div class='dropdown-item'><a href='#period5'><div class='timelineimg' id='period5Image'><p class='centered'><u>Period 5 </u> (1844-1877)</p></div></a></div><div class='dropdown-divider'></div><dvi class='dropdown-item'><a href='#period6'><div class='timelineimg' id='period6Image'><p class='centered'><u>Period 6 </u> (1865-1898) </p></div></a></dvi><div class='dropdown-divider'></div><div class='dropdown-item'><a href='#period7'><div class='timelineimg' id='period7Image'><p class='centered'><u>Period 7 </u> 1890–1945) </p></div></a></div><div class='dropdown-divider'></div><div class='dropdown-item'><a href='#period8'><div class='timelineimg' id='period8Image'><p class='centered'><u>Period 8</u> (1945-1980) </p></div></a></div></div></div></div>")
    }
}

checkSize()
$(window).resize(checkSize);

// window.setInterval(checkSize, 1000);