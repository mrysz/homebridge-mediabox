# Homebridge-mediabox

**[Homebridge](https://github.com/nfarina/homebridge) plugin to switch _on_ and _off_ Mediabox from NC+.**

**Warning!** Its impossible to read current Mediabox state, its unknown is it _on_ or _off_, 
so this plugins cannot be synchronized with current Mediabox state (e.g. Mediabox can be _off_, and switch can be _on_, 
and when you press the switch, its state change to _off_, but Mediabox turns _on_).     

## Instalation

[![NPM](https://nodei.co/npm/homebridge-mediabox.png)](https://nodei.co/npm/homebridge-mediabox/)

1. Install required package: `npm install -g homebridge-mediabox`.
1. Find IP of your Mediabox, e.g. 10.0.0.2.
1. Open webpage http://<MEDIABOX_IP>/upnpdev/, write down UUID.
1. Update your configuration file, including **IP** and **UUID**.

## Configuration
```json
"accessories": [
    {
         "accessory":"Mediabox",
         "name":"Mediabox",
         "ip":"MEDIABOX_IP",
         "port":8080,
         "uuid":"MEDIABOX_UUID"
    }
]
```

## Settings

- `accessory` must be "Mediabox" (required)
- `name` name of the accessory (optional, default to `"Mediabox"`)
- `ip` Mediabox IP address (required)
- `port` port of Mediabox (optional, default to `8080`)
- `uuid` mediabox uuid (required)

## Minimal configuration

Minimal configuration consists only 3 lines:

```json
"accessories": [
    {
         "accessory":"Mediabox",
         "ip":"MEDIABOX_IP",
         "uuid":"MEDIABOX_UUID"
    }
]
```
