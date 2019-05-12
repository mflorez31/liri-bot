require('dotenv').config();
var keys = require("./keys.js");
var request = require('request');
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');
moment().format();
var Spotify = require('node-spotify-api');
var bandsintown = require('bandsintown')('codingbootcamp');
var spotify = new Spotify(keys.spotify);

var input = process.argv;
var action = input[2];
var inputs = process.argv.slice(3).join("");

switch (action) {
case "concert":
bands(inputs);
break;

case "song":
MySpotify(inputs);
break;

case "movie-this":
movie(inputs);
break;

};

function bands(inputs){
    var artist = inputs
    if(!artist){
        artist = "Ariana Grande"
    }
    console.log(artist);
   
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function(response) {
            for(var i =0; i < 3; i++){
                console.log("Concert Date: " +  moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log("Concert Venue Location: " + response.data[i].venue.city);
                console.log("Concert Venue: " +response.data[i].venue.name);
                console.log("===================================================");
            }
        }
      );
};

function MySpotify(inputs){
    var song = inputs;
    if(!song){
        song = "Gettin' Jiggy Wit It"
    }
    spotify.search({ type: "track", query: song }, function(err, data) {
        if (err){
            return console.log('Error occurred: ' +err)
        }
        
        var track = data.tracks.items[1]
        var mySong =
		"-----------------------------------------------------------------------" + "\r\n" +
		"Song Title: " + track.name + "\r\n" +
		"Artist: " + track.artists[0].name + "\r\n" +
		"Album: " + track.album.name + "\r\n" + 
		"Preview Link: " + track.preview_url + "\r\n" +
		"-----------------------------------------------------------------------" + "\r\n"
		console.log(mySong);
    })    
}

function movie(inputs){
    var MovieName = inputs;
    if (!MovieName) {
        MovieName = "Mr. Nobody";
    }
   var queryUrl = "http://www.omdbapi.com/?t=" + MovieName + "&y=&plot=short&apikey=trilogy";

   request.get(queryUrl, function(error, response, body) {     
    if (!error && response.statusCode === 200) {
            var myMovie =
             "-----------------------------------------------------------------------" + "\r\n" +
           "Movie Title: " + JSON.parse(body).Title + "\r\n" +
           "Year movie released: " + JSON.parse(body).Year + "\r\n" +
           "Movie rating: " + JSON.parse(body).Rated + "\r\n" + 
           "Country: " + JSON.parse(body).Country + "\r\n" + 
           "Language: " + JSON.parse(body).Language + "\r\n" + 
           "Movie Plot: " + JSON.parse(body).Plot + "\r\n" +
            "-----------------------------------------------------------------------" + "\r\n"
           console.log(myMovie);
         }
   });

}

