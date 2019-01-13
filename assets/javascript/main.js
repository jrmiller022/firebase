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
    var frequency = 0;
  
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
      });
  
    });
  
    // Firebase watcher + initial loader
    database.ref().on("child_added", function(childSnapshot) {
        name = childSnapshot.val().name;

        destination = childSnapshot.val().destination;

        frequency = childSnapshot.val().frequency; 

        firstTrainTime = childSnapshot.val().firstTrainTime;

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val());
      console.log(name);
      console.log(destination);
      console.log(firstTrainTime);
      console.log(frequency);

      var intFreq = parseInt(frequency);

    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
  
	  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % intFreq;

    // Minutes Until Train
    var tMinutesTillTrain = intFreq - tRemainder;

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
    tableTrainTime.append(nextTrain);
    tableMinutesAway.append(tMinutesTillTrain); 
  
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
    
})
  
 