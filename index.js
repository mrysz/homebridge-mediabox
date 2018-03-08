"use strict";

const request = require('request');
const logger = require('./lib/logger');
let Service, Characteristic;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-mediabox", "Mediabox", Mediabox);
};

/**
 * Mediabox
 */
function Mediabox(log, config) {
    logger.handler = log;

    this.name = config.name || 'Mediabox';
    this.ip = config.ip;

    if (!this.ip) {
        throw new Error("No 'IP' config value");
    }

    this.powerState = false;
}

Mediabox.prototype = {

    getPowerState: function (callback) {
        callback(null, this.powerState);
    },

    setPowerState: function(powerState, callback) {
        this.powerState = powerState;

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
