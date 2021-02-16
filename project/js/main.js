$(document).ready(function(){
  getPosts();
})


function handleSignIn(){
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.email);
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function addMessage(zip,state,city){
  var postData = {
      zip: zip,
      state: state,
      city: city
  }

  var database = firebase.database().ref("posts");

  var newPostRef = database.push();
  newPostRef.set(postData, function(error) {
  if (error) {
    // The write failed...
  } else {
    // Data saved successfull!
     window.location.reload()
  }
});
}

function handleMessageFormSubmit(){
  var zip = $("#zip").val();
  var state = $("#state").val();
  var city = $("#city").val();
  addMessage(zip,state,city);

}

function getPosts(){

  return firebase.database().ref("posts").once('value').then(function(snapshot){
    var posts = snapshot.val();
    console.log(posts);
    
    for(var postKey in posts) {
      var post = posts[postKey];
      console.log(post);
      $("#post-listing").append(" <div>"+post.city+", "+post.state+"  "+post.zip+"</div> ");
    }
  });
}