const express               = require('express')
const routerAuth            = require("./routers/routerAuth")
const routerContent         = require("./routers/routerContent")
const routerConfig          = require("./routers/routerConfig")
const http                  = require('http')
const printToConsole        = require('./utils/printToConsole')

const exp = express();
const server = http.createServer(exp)
const port = process.env.PORT || 3000;

exp.use(routerAuth)
exp.use(routerConfig)
exp.use(routerContent)

server.listen(port, () => {
    printToConsole("server", "Server is up! Using port: ", port, "")
});
