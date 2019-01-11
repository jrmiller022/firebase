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
  
    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(childSnapshot) {
        var train = childSnapshot.val();
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

    
    // // Clock showing on the right side of schedule 
	// function currentTime() {
	// 	var sec = 1;	
	// 	time = moment().format('HH:mm:ss');
	// 	searchTime = moment().format('HH:mm');
	// 		$('#currentTime').html(time);

	// 		t = setTimeout(function() {
	// 			currentTime();
	// 		}, sec * 1000);	
	// }
	// currentTime(); 