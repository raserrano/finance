# Start
npm install
npm start

## Setting up Jquery
cd public/javascript
ln -s jquery.v.0.0.js jquery.js

# Development

Use nodemon for starting up server.
```
nodemon ./bin/wwww
```

# Features added
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