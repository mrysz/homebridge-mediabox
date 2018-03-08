"use strict";

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const soapBody = '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">\n' +
    '   <s:Body>\n' +
    '      <u:ProcessInputEvent xmlns:u="urn:adbglobal.com:service:X_ADB_RemoteControl:1">\n' +
    '         <InputEvent>ev=$key,code=$code</InputEvent>\n' +
    '      </u:ProcessInputEvent>\n' +
    '   </s:Body>\n' +
    '</s:Envelope>';

const soap = function (method, url) {
    this.xmlhttp = new XMLHttpRequest();
    this.xmlhttp.open(method, url, true);
    this.xmlhttp.setRequestHeader("SOAPACTION", '"urn:adbglobal.com:service:X_ADB_RemoteControl:1#ProcessInputEvent"');
    this.xmlhttp.setRequestHeader("Content-Type", "text/xml");
};

soap.prototype = {
    body: function (key, code) {
        let preparedSoapBody = soapBody.replace('$key', key);
        preparedSoapBody = preparedSoapBody.replace('$code', code);

        return preparedSoapBody;
    },

    send: function (key) {
        this.xmlhttp.send(this.body('keydn', key));
        this.xmlhttp.send(this.body('keyup', key));
    }
};

module.exports = soap;
