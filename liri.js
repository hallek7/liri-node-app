
// At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();


//Loading modules

 
// ======== create variables =========//
var Twitter = require('twitter');
var Spotify =  require('node-spotify-api');
var request =  require('request');
var request = require('request');
var fs = require('fs'); //////////// ???????????? is this needed ? 

var keys = require('./keys'); //the code required to import the keys.js file and store it in a variable.
var spotify = new Spotify(keys.spotify);

 
var tweetsArray = [];
var inputeCommand = process.argv[2];
var commandParam = process.argv[3];
var defaultMovie = 'Mr. Nobody';
var defaultMusic = 'The Sign';
var twitterKeys = keys.twitterKeys;
var tmdbKey = keys.tmdbKey;
 
//-----------------------FUNCTIONS-----------------------------------------------
  // Make it liri.js  take in one of the following commands:
//   * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`


// If no song is provided then your program will default to ==========="The Sign" by Ace of Base.============ 

//This function processes the input commands
function processCommands(command, commandParam) {
    //console.log(commandParam);
    switch(command) { // switch command ? 

    //This will show your last 20 tweets and when they were created at in your terminal/bash window.
        case 'my-tweets': 
        getMyTweets (); break;

        case 'spotify-this-song':
        // If no song is provided then your program will default to "The Sign" by Ace of Base.
        if (commandParam === undefined) {
            commandParam = defaultMusic;
        }
        spotifyThis(commandParam); break;  // break ?????????
    
        case 'movie-this':
     //If the user doesn't type a movie in, the program will d\s (commandParam); break; // break ???????????
    case 'do-what-it-says':
       doWhatItSays(); break;  /// do what is says ???????
        default: 
        console.log('Invalid comman. Please type the following commands: my-tweets spotify-this-song movie-this or do-what-it-says');

}
    }

    function getMyTweets(){ 
        var client = new Twitter(keys.twitter);
       var params = {screen_name: 'cnn'}; // ?????????????
      client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {   // ??? 
            //console.log(tweets);
            tweetsArray = tweets;
             for (i=0; i < tweetsArray.length; i ++) {
              console.log ('created at: ' + tweetsArray [i].created_at);
              console.log ('Text: ' + tweetsArray [i].text);
             }       
            }
            else {
                 console.log(error); 
            }
        });
    }

    function spotifyThis(song){
        //If user has not specified a song , default to "Radioactive" imagine dragons
	if(song === ""){
		song = "The Sign";
    }
      
    spotify.search({ type: 'track', query: song}, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var song = data.tracks.items[0];
        console.log("------Artists-----");
        for(i=0; i<song.artists.length; i++){
            console.log(song.artists[i].name);
        }

        console.log("------Song Name-----");
        console.log(song.name);
    
        console.log("-------Preview Link-----");
        console.log(song.preview_url);
    
        console.log("-------Album-----");
        console.log(song.album.name);
    
        });
    
    }

    function movieThis(movieName){

        console.log(movieName);
        request("https://api.themoviedb.org/3/search/movie?api_key=" + tmdbKey + "&query=" + movieName, function(error, response, body) {

     
            //If there were no errors and the response code was 200 (i.e. the request was successful)...
            if (!error && response.statusCode === 200) {
      
              //console.log(JSON.parse(body));
              
              //Get the Movie ID
              var movieID =  JSON.parse(body).results[0].id;
              //console.log(movieID);
      
              //Create new query using the movie ID
              var queryURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + tmdbKey + "&append_to_response=credits,releases";
      
              request(queryURL, function(error, response, body) {
                  var movieObj = JSON.parse(body);
      
                  console.log("--------Title-----------");
                  console.log(movieObj.original_title);
      
                  console.log("--------Year -----------");
                  console.log(movieObj.release_date.substring(0,4));
      
                     console.log("--------Rating-----------");
                     console.log(movieObj.releases.countries[0].certification);
      
                     console.log("--------Country Produced-----------");
                     for(i=0, j = movieObj.production_countries.length; i<j; i++){
                         console.log(movieObj.production_countries[i].name);
                     }
                     console.log("--------Languages-----------");
                     for(i=0, j = movieObj.spoken_languages.length; i<j; i++){
                         console.log(movieObj.spoken_languages[i].name);
                     }
                     console.log("--------Plot----------------");
                     console.log(movieObj.overview);
      
                     console.log("--------Actors-----------");
                     for(i=0, j = movieObj.credits.cast.length; i<j; i++){
                         console.log(movieObj.credits.cast[i].name);
                     }
                  
              });
      
      
            }else{
                console.log(error);
            }
      
          });
      }
      
      function doWhatItSays(){
          fs.readFile('random.txt', 'utf8', function(err, data){
      
              if (err){ 
                  return console.log(err);
              }
      
              var dataArr = data.split(',');
      
              processCommands(dataArr[0], dataArr[1]);
          });
      }
      
     processCommands (process.argv [2], process.argv[3]);
 

       // .argv retruns an array 
      
     































    



 
