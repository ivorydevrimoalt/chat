var socket;
var usernameInput
var chatIDInput;
var messageInput;
var chatRoom;
var dingSound;
var messages = [];
var delay = true;

function onload(){
  socket = io();
  usernameInput = document.getElementById("NameInput");
  chatIDInput = document.getElementById("IDInput");
  messageInput = document.getElementById("ComposedMessage");
  chatRoom = document.getElementById("RoomID");
  dingSound = document.getElementById("Ding");

  socket.on("join", function(room){
    chatRoom.innerHTML = "Chatroom : " + room;
  })

  socket.on("recieve", function(message){
    console.log(message);
    if (messages.length < 9){
      messages.push(message);
      audio = new Audio('www.tetyys.com/SAPI4/SAPI4?text='+message+'&voice=Sam&pitch=140&speed=157'), 
      audio.play()
      
    }
    else{
      messages.shift();
      messages.push(message);
    }
    for (i = 0; i < messages.length; i++){
        document.getElementById("Message"+i).innerHTML = messages[i];
        document.getElementById("Message"+i).style.color = "#303030";
      audio = new Audio('www.tetyys.com/SAPI4/SAPI4?text='+message+'&voice=Sam&pitch=140&speed=157'), 
      audio.play()
    }
  })
}

function Connect(){
  socket.emit("join", chatIDInput.value, usernameInput.value);
}

function Send(){
  if (delay && messageInput.value.replace(/\s/g, "") != ""){
    delay = false;
    setTimeout(delayReset, 1000);
    socket.emit("send", messageInput.value);
    messageInput.value = "";
  }
}

function delayReset(){
  delay = true;
}

function rules() {
window.open("https://9f70a8ce-952a-4128-8582-0f5dcd43d5fc-00-226mmmv0lk7lz.spock.replit.dev/!rules!rules!.html")
setTimeout(function(){Connect(), document.getElementById("ConnectButton").style.display = "none";},10000);
}
