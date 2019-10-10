import socketEvent from "../../socketEvent";

const chatForm = document.getElementById("jsSendMsg");
const chatList = document.getElementById("jsMessages");
const socket = io('/');

const addMessage = (text, nickname) =>{
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <div class="text__layout">
      <span><h6>${nickname} : </h6></span>
      <span><p>${text}</p></span>
    </div>
  `
  chatList.appendChild(listItem);
};

const handleForm = event =>{
  event.preventDefault();
  const nickname = socket.nickname;
  const input = chatForm.querySelector("input");
  const {value} = input;
  input.value = "";
  socket.emit(socketEvent.sendMessage, {message:value});
  addMessage(value, nickname);
};

const handleNewMessage = ({message, nickname}) =>{
  addMessage(message, nickname);
};

if(chatForm){
  chatForm.addEventListener("submit", handleForm);
  socket.on(socketEvent.newMessage, handleNewMessage);
};

