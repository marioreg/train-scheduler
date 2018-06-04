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


function displayTime() {
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    $('#clock').html(time);
    setTimeout(displayTime, 1000);
}

$(document).ready(function() {
displayTime();

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
    var time = snapshot.val().firstTime;


    var startTimeConverted = moment(time, "hh:mm").subtract(1,"years");
    var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
    var timeRemainder = timeDiff % freq;
    var nextTrainMin = freq - timeRemainder;
    var nextTrain = moment().add(nextTrainMin, "minutes");
    var minutesAway = moment(nextTrain).format("HH:mm");

        
    $("#add-train > tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + minutesAway + "</td><td>" + nextTrainMin + "</td></tr>");

        
    });

    
  }

});