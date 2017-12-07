var chaconEmitter = require('./chaconEmitter');
var express = require('express');
var path = require('path');

var pin = 0

var app = express();

chaconEmitter.init();

function sendOnCommand(emitterId, deviceId) {
    chaconEmitter.transmit(chaconEmitter.buildOrder(emitterId, deviceId, true));
}

function sendOffCommand(emitterId, deviceId) {
    chaconEmitter.transmit(chaconEmitter.buildOrder(emitterId, deviceId, false));
}

function sendDimCommand(emitterId, deviceId, dimValue) {
    chaconEmitter.transmit(chaconEmitter.buildDimOrder(emitterId, deviceId, dimValue), true);
}

app.get('/switch/:deviceId/:emitterId/:state', function (req, res) {
    var deviceId = parseInt(req.params.deviceId);
    var emitterId = parseInt(req.params.emitterId);
    var state = req.params.state;

    // console.log(req.route);

    // console.log('deviceId:%s', deviceId);
    // console.log('emitterId:%s', emitterId);
    // console.log('state:%s', state);

    if (state == 'on') {
        sendOnCommand(emitterId, deviceId);
    }
    else if (state == 'off') {
        sendOffCommand(emitterId, deviceId);
    }
    else if (state == 'dim') {
        var dimValue = req.query.value;
        if (dimValue == 'ON') {
            sendOnCommand(emitterId, deviceId);
        }
        else if (dimValue == 'OFF') {
            sendOffCommand(emitterId, deviceId);
        }
        else {
            dimValue = parseInt(req.query.value);
            // console.log('dimValue:%s', dimValue);
            if (0 <= dimValue && dimValue <= 100) {
                // console.log('dimming!');
                sendDimCommand(emitterId, deviceId, dimValue);
            }
        }
    }

    res.status(200);
    res.send();
});

app.listen(8080, '0.0.0.0');

