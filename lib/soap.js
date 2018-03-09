"use strict";

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    init: function (url) {
        this.url = url;

        return this;
    },

    body: function (code, key) {
        return '<?xml version="1.0" encoding="utf-8"?>\n' +
            '<s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">\n' +
            '   <s:Body>\n' +
            '      <u:ProcessInputEvent xmlns:u="urn:adbglobal.com:service:X_ADB_RemoteControl:1">\n' +
            '         <InputEvent>ev=' + key + ',code=' + code + '</InputEvent>\n' +
            '      </u:ProcessInputEvent>\n' +
            '   </s:Body>\n' +
            '</s:Envelope>';
    },

    send: function (code, key = 'keydn') {
        let self = this;

        if (!('url' in this)) {
            throw new Error("No 'url' defined for SOAP request");
        }

        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.url, true);
        xmlhttp.setRequestHeader("SOAPACTION", '"urn:adbglobal.com:service:X_ADB_RemoteControl:1#ProcessInputEvent"');
        xmlhttp.setRequestHeader("Content-Type", "text/xml");
        xmlhttp.send(this.body(code, key));

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200 && key !== 'keyup') {
                self.send(code, 'keyup');
            }
        }
    },
};
