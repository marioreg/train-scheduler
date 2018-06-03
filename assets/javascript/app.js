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

display();

$("#submit").on("click", function(){
  
    event.preventDefault();
  
    var trainName = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var firstTime = $("#train-time").val().trim();
    var frequency = $("#train-frequency").val().trim(); 
        
    firstTime = moment(firstTime, "HH:mm").format("hh:mm a");

    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);
  
    database.ref("/trains").push( {
  
      trainName: trainName,
      destination:destination,
      firstTime: firstTime,
      frequency : frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
  
  
    });
  
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val("");

    display();
  
  });


  function display(){

    $("#add-train > tbody").empty();
    
    database.ref("/trains").on("child_added", function(snapshot, prevChildKey){
    
    console.log(snapshot.val()); 

    var name = snapshot.val().trainName;
    var dest = snapshot.val().destination;
    var freq = snapshot.val().frequency;
    var nextA = "NextArrival";
    var minutesAway = "MinutesAway";
        
    
       $("#add-train > tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + nextA + "</td><td>" + minutesAway + "</td></tr>");

        
    });

  }