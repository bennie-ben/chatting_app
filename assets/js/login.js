const body = document.querySelector("body");
const nickname = localStorage.getItem("nickname");
const loginText = document.getElementById("loginText");
const loginForm = document.getElementById("jsLogin");
const logoutForm = document.getElementById("jsLogout");
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";
const socket = io('/');

const handleLoginText = nickname => 
  loginText.innerText = nickname ? `Hello ${nickname}!` : "";

if(nickname===null){
  body.className = LOGGED_OUT;
}else{
  body.className = LOGGED_IN;
  handleLoginText(nickname);
};

// JS Event Handlers
const handleLoginSubmit = (e) =>{
  e.preventDefault();
  const value = loginForm.querySelector("input").value;
  localStorage.setItem("nickname", value);
  handleLoginText(value);
  setNickname(value);
  body.className = LOGGED_IN;
};

const handleLogout = (e) =>{
  e.preventDefault();
  const nickname = localStorage.getItem("nickname");
  const notifications = document.getElementById("jsNotifications");
  const disconnection = document.createElement("p");
  disconnection.innerText = `${nickname} has left!`;
  notifications.appendChild(disconnection);
  localStorage.removeItem("nickname");
  body.className = LOGGED_OUT;
};

// SocketIO func
const setNickname = nickname => socket.emit(window.socketEvent.setNickname, { nickname });

if(loginForm){
  loginForm.addEventListener("submit", handleLoginSubmit);
};

if(logoutForm){
  logoutForm.addEventListener("submit", handleLogout);
};