import {WebSocketServer} from "ws";

const wss=new WebSocketServer({port:8080});

wss.on("connection",(ws)=>{
    console.log("Client connected");
    wss.on("message",(data)=>{
        console.log("Received:",data.toString());
        ws.send("Hello from server");
    });

    wss.on("close",()=>{
        console.log("Client disconnected");
    });
});
console.log("WebSocket server running on port:8080");