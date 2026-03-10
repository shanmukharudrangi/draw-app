import {WebSocketServer} from "ws";
//import { IncomingMessage } from "http";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const wss=new WebSocketServer({port:8080});

wss.on("connection",(ws,request)=>{
    console.log("Client connected");
    const url=request.url;
    if(!url){
        ws.close();
        return;
    }
    const queryParams=new URLSearchParams(url.split('?')[1]);
    const token=queryParams.get('token');

    if(!token){
        ws.close();
        return;
    }
    const decoded=jwt.verify(token,JWT_SECRET);
    if(!decoded || !(decoded as JwtPayload).userId){
        ws.close();
        return;
    }
    ws.on("message",(data)=>{
        console.log("Received:",data.toString());
        ws.send("Hello from server");
    });

    ws.on("close",()=>{
        console.log("Client disconnected");
    });
});
console.log("WebSocket server running on port:8080");