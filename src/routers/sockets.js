const {sanitizeInput, sanitizeObject}       = require("../utils/other/sanitizeInput.js")
const path                                  = require('path');

const loadSockets = function(io){

    io.on("connection", (socket)=>{

        //Sends message to console
        sendMessage("Websocket connected!")

    //SEND--------------------------------   

        function sendError(data){
        socket.emit("error", data)
        }

        function sendMessage(data){
        socket.emit("message", data)
        }

        function sendMessagePopUp(data){
        socket.emit("messagePopUp", data)
        }

    //------------------------------------   

    //GET---------------------------------  

        socket.on("", async (data, callback)=>{
        })

        socket.on("disconnect", () =>{   
        })

    })

}

module.exports = {loadSockets}
