const mongoose          = require('mongoose');
const printToConsole    = require('../utils/printToConsole');

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error',  function() { printToConsole("error", "Database could not connect.")})
db.once('open', function() { printToConsole("database", "Connected! ", "", "")  })

