#[DC Buses](https://dc-bus.herokuapp.com/) 
This app uses wmata's bus prediction api to draw each wmata bus on a map.  I used google maps for the mapping aspect, Angular for the front-end, and Node/Express for the back-end.

Data updates every 20 seconds at which point bus markers will be removed and re-drawn without a page refresh.

Web sockets (socket.io) make up the connection between the front-end and the back-end so the front-end will only update when the back-end emits an update event.

##Installation instructions
*  Clone this repo.
*  Run `npm install`
*  You'll have to substitute your own [api key for wmata](https://developer.wmata.com/) as well as your own [google maps api key](https://developers.google.com/maps/signup?hl=en).
*  Once everything is set up, run `node index.js` or `nodemon`.
*  Go to `localhost:3000`.

##Use
*  When the page loads, it will request access to the user's location.  You have to accept to continue.
*  The user is represented in the middle of the initial map, buses are represented by black bus icons.
*  There is some data to the right regarding the total number of buses and the user's location.
*  Clicking on a bus will populate some information about that bus and estimate that bus's present route on the map.
*  Routing is an estimate only, based on the bus's current location and its destination.

##Challenges
Building this app was fairly straightforward.  Wmata provides a latitude and longitude for each bus, so most of the functionality is achieved simply by looping through an array of buses and creating a marker for each lat/long pair.

The infowindows for each bus were created in this same loop through the use of closures.  This was my first time using closures, and this example turned out to be a good example of how useful closures can be when it comes to generating many different callbacks that have roughly the same structure with some slight differences.
