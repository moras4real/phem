const express = require ('express')
const app = express()
const cors = require ('cors')
app.use(cors())
const mongoose = require('mongoose')

let PORT = process.env.PORT_NUMBER || 4000


// require('./connection/mongoose.connection')
let URI = "mongodb+srv://arayosam:X3RFIwvL1klyHXOz@cluster0.ycrt4sy.mongodb.net/loveEjs_db?retryWrites=true&w=majority"
mongoose.connect(URI)
.then(()=>{
    console.log("Mongoose has connected successfully")
})
.catch((err)=>{
    console.log(err);
})

// app.get('/', (req, res)=>{
//     res.sendStatus(200)
// })

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