var gps = require("octopus-gps-tracking");
 
var options = {
    'debug'                 : true,
    'port'                  : process.env.PORT || 5000,
    'device_adapter'        : "TK103_2"
}
 
var server = gps.server(options,function(device,connection){

    device.on("connected",function(data){
        
        console.log("I'm a new device connected");
        console.log(data);
        return data;

    });
 
    device.on("login_request",function(device_id,msg_parts){
 
        // Some devices sends a login request before transmitting their position 
        // Do some stuff before authenticate the device... 
        console.log(device_id);
        // Accept the login request. You can set false to reject the device. 
        this.login_authorized(true);
 
    });
 
 
    //PING -> When the gps sends their position 
    device.on("ping",function(data){
        console.log(data);
        //After the ping is received, but before the data is saved 
        //console.log(data); 
        return data;
 
    });
 
});
/*var gps = require("gps-tracking");

var options = {
    'debug'                 : false, //We don't want to debug info automatically. We are going to log everything manually so you can check what happens everywhere
    'port'                  : process.env.PORT || 5000,
    'device_adapter'        : "TK103"
}

var server = gps.server(options,function(device,connection){
    
    device.on("connected",function(data){
        
        console.log("I'm a new device connected");
        console.log(data);
        return data;

    });

    device.on("login_request",function(device_id,msg_parts){

        console.log('Hey! I want to start transmiting my position. Please accept me. My name is '+device_id);

        this.login_authorized(true); 

        console.log("Ok, "+device_id+", you're accepted!");

    });
    

    device.on("ping",function(data){
        //this = device
        console.log("I'm here: "+data.latitude+", "+data.longitude+" ("+this.getUID()+")");

        //Look what informations the device sends to you (maybe velocity, gas level, etc)
        //console.log(data);
        return data;

    });

   device.on("alarm",function(alarm_code,alarm_data,msg_data){
        console.log("Help! Something happend: "+alarm_code+" ("+alarm_data.msg+")");
    }); 

    //Also, you can listen on the native connection object
    connection.on('data',function(data){
        //echo raw data package
        console.log(data.toString()); 
    })

});*/