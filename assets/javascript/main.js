$(document).ready(function() {

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCjgHbiIyO-jG-9cHYFQe5bKQxm8tfq-XQ",
  authDomain: "fir-assignment-f2c67.firebaseapp.com",
  databaseURL: "https://fir-assignment-f2c67.firebaseio.com",
  projectId: "fir-assignment-f2c67",
  storageBucket: "fir-assignment-f2c67.appspot.com",
  messagingSenderId: "1058098864956"
};
firebase.initializeApp(config);
  
  //create a variable reference to the database.
  var database = firebase.database();
  
  // Initial Values
    var name = "";
    var destination = "";
    var firstTrainTime =  "";
    var frequency = "";
  
    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();
  
      // Grabbed values from text-boxes
      name = $("#name-input").val().trim();
      $("#name-input").val("");

      destination = $("#destination-input").val().trim();
      $("#destination-input").val("");

      firstTrainTime = $("#firstTrainTime-input").val().trim();
      $("#firstTrainTime").val("");

      frequency = $("#frequency-input").val().trim();
      $("#frequency-input").val("");
  
      // Code for "Setting values in the database"
      database.ref().push({

        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
  
    });
  
    // Firebase watcher + initial loader
    database.ref().on("child_added", function(childSnapshot) {
        var train = childSnapshot.val.name;

        destination = childSnapshot.val.destination;

        frequency = childSnapshot.val.frequency; 

        firstTrainTime = childSnapshot.val.firstTrainTime;
  
        // trainRow.append(trainCell);
        // $('#name-display').append(trainRow)

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val());
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrainTime);
      console.log(childSnapshot.val().frequency);
  
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
  
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  
        var destination = moment(snapshot.val().destination);
     // Change the HTML to reflect
     $("#name-display").text(snapshot.val().name);
     $("#destinaton-display").text(snapshot.val().destination);
     $("#firstTrainTime-display").text(snapshot.val().firstTrainTime);
     $("#frequency-display").text(snapshot.val().frequency);
     console.log(destination.diff(moment(), "destination"));
    });

  // New variable
  var trainFreq;
  var diffTime;
  var tRemainder;
  var nextTrainTime;
  var minutesAway;

  // Train time entered on the entry form
    var firstTime = 0;

 var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  
	  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;

    // Minutes Until Train
    var tMinutesTillTrain = frequency - tRemainder;

    // Train arrival next
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm A");

    //Change the HTML to reflect the inputs into the table
    var tableRow = $("<tr>");
    var tableTrainName = $("<td>");
    var tableDestination = $("<td>");
    var tableFrequency = $("<td>");
    var tableTrainTime = $("<td>");
    var tableMinutesAway = $("<td>");

    // Creates table data for each input.
    $("tbody").append(tableRow);
    tableRow.append(tableTrainName);
    tableRow.append(tableDestination);
    tableRow.append(tableFrequency);
    tableRow.append(tableTrainTime);
    tableRow.append(tableMinutesAway);


    // Appends the value to the table in single row
    tableTrainName.append(name);
    tableDestination.append(destination);
    tableFrequency.append(frequency);
    tableTrainTime.append(nextTrainTime);
    tableMinutesAway.append(minutesAway); 
  })
  

