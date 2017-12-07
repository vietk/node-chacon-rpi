var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://mosquitto');
var chaconEmitter = require('./chaconEmitter');

chaconEmitter.init();

var switchTopic = 'chacon/switch';
var dimmerTopic = 'chacon/dimmer';
var emitterId = 12325261;

client.subscribe(switchTopic);
client.subscribe(dimmerTopic);

client.on('message', function (topic, message) {

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

function sendOnCommand(emitterId, deviceId) {
    chaconEmitter.transmit(chaconEmitter.buildOrder(emitterId, deviceId, true));
}

function sendOffCommand(emitterId, deviceId) {
    chaconEmitter.transmit(chaconEmitter.buildOrder(emitterId, deviceId, false));
}

function sendDimCommand(emitterId, deviceId, dimValue) {
    chaconEmitter.transmit(chaconEmitter.buildDimOrder(emitterId, deviceId, dimValue), true);
}