var chaconEmitter = require('./chaconEmitter');
var express = require('express');
var path = require('path');

var pin = 0

var app = express();

chaconEmitter.init();

app.get('/switch/:deviceId/:emitterId/:state', function (req, res) {
    var deviceId = parseInt(req.params.deviceId);
    var emitterId = parseInt(req.params.emitterId);
    var state = req.params.state;

    // console.log(req.route);

    // console.log('deviceId:%s', deviceId);
    // console.log('emitterId:%s', emitterId);
    // console.log('state:%s', state); 

    if (state == 'on') {
        chaconEmitter.transmit(chaconEmitter.buildOrder(emitterId, deviceId, true));
    }
    else if (state == 'off') {
        chaconEmitter.transmit(chaconEmitter.buildOrder(emitterId, deviceId, false));
    }
    else if (state == 'dim') {
        var dimValue = parseInt(req.query.value);
	// console.log('dimValue:%s', dimValue);
	if (0 <= dimValue && dimValue <= 100) {
	   // console.log('dimming!');
           chaconEmitter.transmit(chaconEmitter.buildDimOrder(emitterId, deviceId, dimValue), true);
	}
    }

    res.status(200);
    res.send();
});

app.listen(8089);
