var user_name=localStorage.getItem("user_name");
var room_name=localStorage.getItem("room_name");
function getData() { 
      firebase.database().ref("/"+room_name).on('value', function(snapshot) 
      { document.getElementById("output").innerHTML = "";
       snapshot.forEach(function(childSnapshot){ childKey  = childSnapshot.key;
             childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
name=message_data["name"];
var message=message_data["message"];
var like=message_data["like"];
name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>"; like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>"; span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>"; row = name_with_tag + message_with_tag +like_button + span_with_tag; document.getElementById("output").innerHTML += row;
      } });  }); }
getData();
function logout() {
        console.log("in the log out");
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
      }
      function send(){
            var msg = document.getElementById("msg").value;
            firebase.database().ref(room_name).push({
                  name:user_name,
                  message:msg,
                  like:0
            });
            document.getElementById("msg").value="";
      };
      function updateLike(messageid){
            button=messageid;
            likes=document.getElementById(button).value;
            updatedLike=Number(likes)+1;
            firebase.database().ref(room_name).child(messageid).update({
                  like:updatedLike
            });
      }