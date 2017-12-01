var chaconEmitter = require('./chaconEmitter');
var express = require('express');
var path = require('path');

var pin = 0

// var index = require('./routes/index');
// var users = require('./routes/users');


var router = express.Router();
var app = express();

router.put('switch/:device_id/emitterId:emiter_id/', function(req, res) {
    var deviceId = req.parameter.device_id;
    var emiterId = req.parameter.emiter_id;

    res.status(200);
});

//app.get('/', router);
app.get('/switch/:deviceId/:emitterId/:state/:dim', function (req, res) {
    var deviceId = req.params.deviceId;
    var emiterId = req.params.emiterId;
    var state = req.params.state;

    if (state == 'on') {
        chaconEmitter.transmit(chaconEmitter.buildOrder(emiterId, deviceId, true));
    }
    else if (state == 'off') {
        chaconEmitter.transmit(chaconEmitter.buildOrder(emiterId, deviceId, false));
    }
    else if (state == 'dim') {
        var dim = parseInt(req.params.dim);
        chaconEmitter.transmit(chaconEmitter.buildDimOrder(emiterId, deviceId, dim));
    }

    res.status(200);
    res.send();
})
app.listen(8080);