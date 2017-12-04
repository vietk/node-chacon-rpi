# node-rpi-chacon

Tiny node application serving rest request to send RF433 commands to a chacon device.

## How to use
There are 1 rest endpoint with the following methods : 
* http://host:port/switch/@deviceId@/@emitterId@/@state@
* http://host:port/switch/@deviceId@/@emitterId@/dim?level=@dimValue@

Where 
* deviceId is the unique identifier of the device associated
* emitterId is the registered emitterId
* state is either on or off
* dimValue is an integer between 0-100 for the brightness level of a light bulb.

## Docker image 
Image name kviet/node-rpi-chacon

The docker image expose the port 8080 in order to target the endpoint. 
The container should be started with enough priviliged to be able to use the GPIO of the RPI

* Example : 
sudo docker run --privileged --rm --name node-rpi-chacon- --net=host kviet/node-rpi-chacon
