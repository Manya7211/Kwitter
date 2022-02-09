var firebaseConfig = {
      apiKey: "AIzaSyCAnsy0BdOBZjFMpf5vNuz7xFRqh3GVWY8",
      authDomain: "kwitter-38a2c.firebaseapp.com",
      databaseURL: "https://kwitter-38a2c-default-rtdb.firebaseio.com",
      projectId: "kwitter-38a2c",
      storageBucket: "kwitter-38a2c.appspot.com",
      messagingSenderId: "211002307720",
      appId: "1:211002307720:web:31377b92112d4b90281b3d"
};
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: username,
            message: msg,
            like: 0
      });
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
      firebase_message_id = childKey;
      message_data = childData;
      //Start code
      console.log(firebase_message_id);
      console.log(message_data);
      msg_name = message_data["name"];
      msg = message_data["message"];
      msg_likes = message_data["like"];
      nameWithTag = "<h4>" + msg_name + "<img class = 'user_tick' src = 'tick.png'> </h4>";
      msgWithTag = "<h4 class = 'message_h4'>" + msg + "</h4>";
      likeButton = "<button class = 'btn btn-warning' id = " + firebase_message_id + "value = " + msg_likes + "onclick = 'updateLike(this.id)'>";
      spanWidthTag = "<span class = 'glyphicon glyphicon-thumbs-up'>Likes: " + msg_likes + "</span> </button> <hr>";
      row = nameWithTag + msgWithTag + likeButton + spanWidthTag;
      document.getElementById("output").innerHTML += row;
      //End code
} });  }); }
getData();

function updateLike(message_id) {
      console.log("Clicked on Like Button - " + message_id);
      buttonID = message_id;
      likes = document.getElementById(buttonID).value;
      updatedLikes = Number(likes) + 1;
      console.log(updateLikes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updateLikes
      });
}

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}