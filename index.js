import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('public'))

app.get('/' , (req,res)=>{
    res.send("server is started")
})

io.on('connection' , (socket)=>{
    console.log(`A client is connect on ${socket.id}`)
    socket.on('toAll' , (data)=>{
        console.log(data)
        const response = {
            'message' : 'data.message',
            'user' : socket.id
        }
        io.emit('everyone' , response)
    })
} )

server.listen(8080 , ()=>{
    console.log(`server is running on localhost:8080`)
})