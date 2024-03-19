import express,{json} from "express";
import http from "node:http";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import { resolve } from "path";
import cors from "cors";
import { moviesRouter } from './routers/movies.js'
import {conexionDB} from './schemas/db.js'
import routerAuth from "./routers/auth.router.js";
import cookieParser from "cookie-parser";

const allowedOrigins = [
  'https://react-projects-blond-ten.vercel.app',
  'https://react-projects-3hys.vercel.app',

  // Agrega aquí todas las URLs permitidas que desees
];

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});
conexionDB();
app.use(cors({
  origin: allowedOrigins,
  credentials:true
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(resolve("frontend/dist")));

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (body) => {
      socket.broadcast.emit("message", {
          body,
          from: socket.id.slice(8),
      });
  });
  
  
});

app.use(json())




app.use('/movies',moviesRouter)
app.use('/log',routerAuth)



const PORT = process.env.PORT ?? 1234
server.listen(PORT);
console.log(`server on port ${PORT}`);
