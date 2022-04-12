const { Socket } = require("socket.io")

const socketController = (socket) =>{
    socket.on('connected',(payload)=>{
        console.log(payload);
    })
}

module.exports = {
    socketController
}