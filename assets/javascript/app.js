//Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCGzaBhkg8aDwNVYlj1oUROZNW0EFGVuOg",
    authDomain: "mr-project-1b19c.firebaseapp.com",
    databaseURL: "https://mr-project-1b19c.firebaseio.com",
    projectId: "mr-project-1b19c",
    storageBucket: "mr-project-1b19c.appspot.com",
    messagingSenderId: "231087247385"
  };
  firebase.initializeApp(config);
var database = firebase.database();




$("#submit").on("click", function(){
  
    event.preventDefault();
  
    var trainName = $("#train-name").val().trim();
    var detination = $("#train-destination").val().trim();
    var firstTime = $("#train-time").val().trim();
    var frequency = $("#train-frequency").val().trim(); 
        
    firstTime = moment(firstTime, "HH:mm").format("hh:mm a");

    console.log(trainName);
    console.log(detination);
    console.log(firstTime);
    console.log(frequency);
  
    database.ref("/trains").push( {
  
      trainName: trainName,
      detination:detination,
      firstTime: firstTime,
      frequency : frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
  
  
    });
  
 //
  
  });