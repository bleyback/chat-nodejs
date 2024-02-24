import { Router } from "express";

const router = Router();

const configureChatRoutes = (io) => {
    io.on("connection", (socket) => {
        console.log(socket.id);
        socket.on("message", (body) => {
            socket.broadcast.emit("message", {
                body,
                from: socket.id.slice(8),
            });
        });
        

    });

    return router;
};

export default configureChatRoutes;