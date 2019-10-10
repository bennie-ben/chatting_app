import socketEvent from "./socketEvent";

const socketController = socket =>{
  socket.on(socketEvent.setNickname, ({nickname})=>{
    socket.nickname = nickname;
    socket.broadcast.emit(socketEvent.newUser, {nickname});
    socket.on("disconnect", () => {
      socket.broadcast.emit(socketEvent.disconnectUser, {nickname});
    });
  });
  socket.on(socketEvent.sendMessage, ({message})=>{
    console.log(message);
    socket.broadcast.emit(socketEvent.newMessage, {message})
  });
};

export default socketController;