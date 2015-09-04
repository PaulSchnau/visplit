# Visplit
An experimental web splitter. This goal is to show many splitters in real time. 
Live at [visplit.com](http://visplit.com)

## Development
### Local Webserver

1. [Install meteor](https://www.meteor.com/install)
2. Run terminal commands:
```
git clone https://github.com/PaulSchnau/visplit
cd visplit
meteor
```


### Android
```
meteor install-sdk android
meteor add-platform android
meteor run android
```


### iOS
```
meteor install-sdk ios
meteor add-platform ios
meteor run ios
```


### Production Deployment
Deploy using [mupx](https://github.com/arunoda/meteor-up/tree/mupx):
```
npm install -g mupx
mupx init
# Edit your mup.json file
mupx setup
mupx deploy
```
