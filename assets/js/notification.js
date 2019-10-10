const socket = io('/');
const notifications = document.getElementById("jsNotifications");

const userConnected = ({nickname}) =>{
  const connection = document.createElement("p");
  connection.innerText = `${nickname} has joined!`;
  notifications.appendChild(connection);
};
const userDisconnected = ({nickname}) =>{
  const disconnection = document.createElement("p");
  localStorage.removeItem("nickname");
  disconnection.innerText = `${nickname} has left!`;
  notifications.appendChild(disconnection);
};

socket.on(window.socketEvent.newUser, userConnected);
socket.on(window.socketEvent.disconnectUser, userDisconnected);