const express = require ('express')
const app = express()
const cors = require ('cors')
app.use(cors())





let connection = app.listen(4000,()=>{
    console.log(`successful, running on port 4000`)
})

let socketClient=require("socket.io")
let io = socketClient(connection,{
    cors :{origin:"*"}
})
io.on("connection",(socket)=>{
    // console.log(socket.id)
    console.log("A user connected successfully")
    socket.on("sendMsg",(message)=>{
        console.log(message)
        io.emit("broadcastMsg",message)
    })
    
    socket.on("disconnect",()=>{
            console.log("someone disconnected")
        })
    })