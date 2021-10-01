# ha-nfl-card
A Home Assistant frontend custom card for the [ha-nfl](https://github.com/zacs/ha-nfl) integration.
![pregame](https://user-images.githubusercontent.com/9123670/135565805-193acf8c-82dd-42f3-ae66-761a5168538c.png)
![ingame](https://user-images.githubusercontent.com/9123670/135565814-64216f14-6f02-4742-a0fd-4964c07fce37.png)
![final](https://user-images.githubusercontent.com/9123670/135565818-5fca43ec-76b8-47f5-8d40-47f1a96df334.png)


Currently in development.

## HACS Installation
 - In the HACS UI, click the 3 dots in the upper right
 - Click 'Add Custom Repository'
 - Fill in the repo url https://github.com/D34DC3N73R/ha-nfl-card and choose 'Lovelace' category.
 - install the custom card
 - Add the following to your resources
```
url: /hacsfiles/ha-nfl-card/ha-nfl-card.js
type: module
```

## Manual Installation
 - Download [ha-nfl-card.js](https://raw.githubusercontent.com/D34DC3N73R/ha-nfl-card/main/dist/ha-nfl-card.js)
 - Copy to www/community/ha-nfl-card/ (make the ha-nfl-card directory)
 - Add the following to your resources
```
url: /hacsfiles/ha-nfl-card/ha-nfl-card.js
type: module
```

## Configuration
```
type: 'custom:nfl-card'
entity: sensor.nfl
```
Where `sensor.nfl` is the sensor name from the [ha-nfl](https://github.com/zacs/ha-nfl) integration.
