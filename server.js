import { join } from "path";
import express from "express";
import morgan from "morgan";
import socketIO from "socket.io";
import socketEvent from "./socketEvent";
import socketController from "./socketController";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));
app.use(morgan("dev"));
app.get('/', (req, res)=>res.render( "home", {socketEvent:JSON.stringify(socketEvent)} ));

const handleListening = () => console.log(`Server Listening On : http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);
const io = socketIO.listen(server);

io.on("connection", socket=>socketController(socket));
