const {sanitizeInput, sanitizeObject}       = require("../utils/other/sanitizeInput.js")
const verifyNick                            = require("../utils/profile/verifyNick.js")

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

        socket.on("nick", async (data, callback)=>{
            dataSanit = sanitizeInput(JSON.parse(data))
            verifyNick(dataSanit).then((dataReturn)=>{callback(dataReturn)})
        })

        socket.on("disconnect", () =>{   
        })

    })

}

module.exports = {loadSockets}
