# Finance App

The project will follow the 9 steps from _Your money or your life_ from Vicky Robin.
The purpose of it is to serve as your wall chart that will show you exactly where you are in terms
of reaching *FIRE*

## Project setup
As time of reviewing this abandon project I decided I will stick to [Node JS (LTS)](https://nodejs.org/en/about/releases/) at the time v14.17.0.
NVM is recommened and _.npmrc_ will be added with this update.

To start the project:
```bash
npm install 
npm start
```

## Setting up Jquery
cd public/javascript
ln -s jquery.v.0.0.js jquery.js

## Development guidelines

Use nodemon for starting up server.
```
nodemon ./bin/wwww
```

## TODO - Features added
- [x] CDP's
- [x] Interest
- [x] Currencies
- [x] Automated task for daily update of Currency.
- [X] Metals.
- [] About Page and contact page.
- [] Users and Session


Queries
db.metals.find({metal:'silver'}).snapshot().forEach(function (e) {e.price = e.price/100;db.metals.save(e);})
db.metals.find({metal:'silver'}).snapshot().forEach(function (e) {e.price = e.price/32150.7;db.metals.save(e);})