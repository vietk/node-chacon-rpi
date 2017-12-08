var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost:1883');
var chaconEmitter = require('./chaconEmitter');

chaconEmitter.init();

var switchTopic = 'chacon/switch';
var dimmerTopic = 'chacon/dimmer';
var emitterId = 12325261;

client.subscribe(switchTopic, function (err, result) {
    if (err) {
        console.error(err);
    }
    console.log(result);
});

client.subscribe(dimmerTopic, function (err, result) {
    if (err) {
        console.error(err);
    }
    console.log(result);
});

console.log('Client subscription done');

client.on('connect', function() {
    console.log('Connected');
});
client.on('error', function(){
    console.log('Error');
});
client.on('message', function (topic, message) {

    console.log('Received message %s on topic %s', message.toString(), topic);

    var command = JSON.parse(message.toString());
    var deviceId = command.deviceId;
    if (topic === switchTopic) {
        if (command.value ===  'ON') {
            sendOnCommand(emitterId, deviceId);
        }
        else if (command.value === 'OFF') {
            sendOffCommand(emitterId, deviceId);
        }
    }
    else if (topic === dimmerTopic) {
        if (command.value === 'ON') {
            sendOnCommand(emitterId, deviceId);
        }
        else if (command.value === 'OFF') {
            sendOffCommand(emitterId, deviceId);
        }
        else {
            var dimValue = parseInt(command.value);
            if (0 <= dimValue && dimValue <= 100) {
                sendDimCommand(emitterId, deviceId, dimValue);
            }
        }
    }
});

console.log('exiting');

function sendOnCommand(emitterId, deviceId) {
    chaconEmitter.transmit(chaconEmitter.buildOrder(emitterId, deviceId, true));
}

function sendOffCommand(emitterId, deviceId) {
    chaconEmitter.transmit(chaconEmitter.buildOrder(emitterId, deviceId, false));
}

function sendDimCommand(emitterId, deviceId, dimValue) {
    chaconEmitter.transmit(chaconEmitter.buildDimOrder(emitterId, deviceId, dimValue), true);
}

