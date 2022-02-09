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
document.getElementById("username").innerHTML = "Welcome " + username + "!";

function addRoom() {
      roomName = document.getElementById("room_name").value;
      firebase.database().ref("/").child(roomName).update({
            purpose: "Adding Room Name"
      });
      localStorage.setItem("room_name", roomName);
      window.location = "kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
      Room_names = childKey;
      //Start code
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}