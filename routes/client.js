module.exports = function(app,obj,binance){

    binance.futuresMiniTickerStream( 'BTCUSDT', (data)=>{
        // console.log(data.close);
        app.io.sockets.emit("server-send-price",data.close);

    });

    app.get("/buy/:amount",function(req,res){
        var quantity = parseFloat(req.params.amount);
        binance.marketBuy("BTCUSDT", quantity)
        .then((data)=>{
            console.log(data);
        res.json(data);
        })
        .catch((err)=>{
            console.log(err.body);
            res.json(err.body);
        });

    });

    app.get("/",function(req,res){
        // res.send("hello " + obj.KEY);
        res.render("master");

    });

};