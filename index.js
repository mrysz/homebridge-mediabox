"use strict";

const logger = require('./lib/logger');
const soap = require('./lib/soap');
const multibox = require('./lib/multibox');
let Service, Characteristic;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-mediabox", "Mediabox", Mediabox);
};

function Mediabox(log, config) {
    logger.handler = log;

    this.name = config.name || 'Mediabox';
    this.port = config.port || 8080;
    this.ip = config.ip;
    this.uuid = config.uuid;

    if (!this.ip) {
        throw new Error("No 'IP' config value");
    }

    if (!this.uuid) {
        throw new Error("No 'UUID' config value");
    }

    this.sensors = [];
    this.powerState = false;
    this.url = "http://" + this.ip + ":" + this.port + "/upnpfun/ctrl/uuid_" + this.uuid + "/04";
}

Mediabox.prototype = {

    getPowerState: function (callback) {
        logger.log('info', 'Get is ' + this.powerState);
        callback(null, this.powerState);
    },

    setPowerState: function (powerState, callback) {
        logger.log('info', 'Set to ' + powerState);
        this.powerState = powerState;

        soap
            .init(this.url)
            .send(multibox['POWER']);

        callback();
    },

    identify: callback => callback(),

    getServices: function () {
        let informationService = new Service.AccessoryInformation();
        informationService
            .setCharacteristic(Characteristic.Manufacturer, "Mediabox")
            .setCharacteristic(Characteristic.Model, "Mediabox")
            .setCharacteristic(Characteristic.SerialNumber, "0000-0000-0000");
        this.sensors['information'] = informationService;

        let switchService = new Service.Switch(this.name);
        switchService.getCharacteristic(Characteristic.On)
            .on('get', this.getPowerState.bind(this))
            .on('set', this.setPowerState.bind(this));
        this.sensors['switch'] = switchService;

        return Object.values(this.sensors);
    }
};
