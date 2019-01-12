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
      destination = $("#destination-input").val().trim();
      firstTrainTime = $("#firstTrainTime-input").val().trim();
      frequency = $("#frequency-input").val().trim();
  
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
        var train = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency; 
        var firstTrainTime = childSnapshot.val().firstTrainTime;
        var trainRow = $('<tr>');
        var trainCell = $('<td>').text(train.name);
  
        trainRow.append(trainCell);
        $('#name-display').append(trainRow)

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

  // Train time entered on the entry form
    var firstTime = 0;

 var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  
	  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minutes Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Train arrival next
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + 
   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(name),
      // $("<td>").text(destination),
      // $("<td>").text(frequency),
      // $("<td>").text(nextTrain),
      // $("<td>").text(minutesAway),
    );
  
    // Append the new row to the table
    $(".table > tbody").append(newRow);
  
    // Time clock
	function currentTime() {
		var sec = 1;	
		time = moment().format('HH:mm:ss');
		searchTime = moment().format('HH:mm');
			$('#currentTime').html(time);

			t = setTimeout(function() {
				currentTime();
			}, sec * 1000);	
	}
  currentTime(); 
  