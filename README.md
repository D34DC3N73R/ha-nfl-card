# ha-nfl-card
A Home Assistant frontend custom card for the ha-nfl integration.

Currently in development.

## Installation
Manually install until I can figure out how to get this on HACS.
 - Download [ha-nfl-card.js](https://raw.githubusercontent.com/D34DC3N73R/ha-nfl-card/main/dist/ha-nfl-card.js)
 - Copy to www/community/ha-nfl-card/ (make the ha-nfl-card directory)
 - Add the following to your resources
```
url: /hacsfiles/ha-nfl-card/ha-nfl-card.js
type: module
```

## Configuration
```
- type: 'custom:nfl-card'
  entity: sensor.nfl
```
Where `sensor.nfl` is the sensor name from the [ha-nfl](https://github.com/zacs/ha-nfl) integration.
