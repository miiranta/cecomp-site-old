const express               = require('express')
const http                  = require('http')
const path                  = require("path")
const hbs                   = require('hbs')
const routerAuth            = require("./routers/routerAuth")
const routerContent         = require("./routers/routerContent")
const routerConfig          = require("./routers/routerConfig")
const printToConsole        = require('./utils/printToConsole')
require('./db/mongoose.js')

const exp = express();
const server = http.createServer(exp)
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "../public") 
const viewsDirectory = path.join(__dirname, "../templates/views") //HBS views
const partialsDirectory = path.join(__dirname, "../templates/partials") //HBS partials
exp.set("view engine","hbs")
exp.set("views", viewsDirectory)
hbs.registerPartials(partialsDirectory)
exp.use(express.static(publicDirectory))

exp.use(express.json({limit: '20mb'}))

exp.use(routerAuth)
exp.use(routerConfig)
exp.use(routerContent)

server.listen(port, () => {
    printToConsole("server", "Server is up! Using port: ", port, "")
});


