import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    io = new Server(server,{
        cors:{
            origin:"*"
        }
    });

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
    });
    return io;
}

export const getIO = () =>{
    if(!io){
        throw new Error('IO not initialized')
    }

    return io;
}