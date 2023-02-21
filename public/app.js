const firebaseConfig = {
    apiKey: "AIzaSyB4Fb963nW6bL_hE9DldojHr1XItu0zymI",
    authDomain: "todo-9aa52.firebaseapp.com",
    projectId: "todo-9aa52",
    storageBucket: "todo-9aa52.appspot.com",
    messagingSenderId: "992605292991",
    appId: "1:992605292991:web:395929852abc0c1e4e390a",
    measurementId: "G-ENH90LDWBX"
  };
  const app = firebase.initializeApp(firebaseConfig);

  var uid;
  var userId;


  function signUpUser() {
    var userEmail = document.getElementById("email").value
    var userPass = document.getElementById("pass").value
    app.auth().createUserWithEmailAndPassword(userEmail, userPass)
    .then(function (res) {
        console.log(res);
        // var keys = app.database().ref('/').child("usersData/").push().key;
        var userData = {
            username: userEmail,
            pass: userPass,
            key:res.user.uid

        }
            app.database().ref('/').child("usersData/").push(userData);
        })
        .catch(function (err) {
            console.log(err)
            alert(err.message)
        })
    // 
}

function loginUser() {
    var userEmail = document.getElementById("emailLogin").value
    var userPass = document.getElementById("passLogin").value

    app.auth().signInWithEmailAndPassword(userEmail, userPass)
        .then(function (res) {
            console.log(res);
            // app.database().ref('/').child("usersData/").push(userData);
        })
        .catch(function (err) {
            console.log(err)
            alert(err.message)
        })
    // 
}

function addToCart(eleThis){
    console.log(uid,eleThis)
    if(uid){
        console.log(eleThis.parentNode.childNodes[0])
        console.log("logined");
        // var allUser=[] ;
        var proObj={
            title:eleThis.parentNode.childNodes[0].innerHTML,
            price:23232
        }
        app.database().ref('/usersData').on('child_added', (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            // allUser.push(data);
            if(uid == snapshot.val().key){
                app.database().ref('/usersData').child(snapshot.key).child("cartList").push(proObj)
            }
            // updateStarCount(postElement, data);
          });
          
    }
    else{
    alert('please login first')
    }
    }
    function onAuth(){

        app.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                uid = user.uid;
                console.log(uid, user)
                // ...
            } else {
                // User is signed out
                uid=undefined
                console.log("logout");
                // ...
            }
        });
    }
    
    
    function logout() {
        firebase.auth().signOut().then((data) => {
            console.log(data)
            // Sign-out successful.
            uid=undefined;
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });
    }