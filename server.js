const { json } = require("body-parser");
var express = require("express");
const Binance = require('node-binance-api');
var fs = require("fs");
var app = express();
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("public"));
var server = require("http").Server(app);
var io = require("socket.io")(server);
app.io = io;
server.listen(3000);

io.on("connection",function(socket){
 console.log("New connection:" + socket.id);

});

loadconfigFile("./config.json");

function loadconfigFile(file){
    var obj;
 fs.readFile(file,"utf8",function(err,data){
    if(err)throw err;
    obj = JSON.parse(data);
    

    const binance = new Binance().options({
        APIKEY: obj.API,
        APISECRET: obj.KEY
      });

      
    require("./routes/client")(app,obj,binance);

    });

}
