import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('public'))

app.get('/' , (req,res)=>{
    res.send('fuck off')
})

io.on('connection' , (socket)=>{
    console.log(`ws connected ${socket.id}`)
    socket.on('disconnect' , ()=>{
        console.log(`ws disocnnected - ${socket.id}`)
    } )
    socket.on('message' , (data)=>{
        console.log(`message - ${data}`)
        io.emit('toFrontend' , 'message recieved')
    })
    
})



server.listen(8080 , ()=>{
    console.log(`server is running on port 8080`)
})