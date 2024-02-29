const express = require ('express')
const app = express()
const cors = require ('cors')
app.use(cors())

let PORT = process.env.PORT_NUMBER || 4000



let connection = app.listen(PORT,()=>{
    console.log(`successful, running on port ${PORT}`)
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