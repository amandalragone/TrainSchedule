$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyCj_UEZL3cxAXv7HPQXt-VttZL9P34QbYA",
        authDomain: "trainschedule-9946f.firebaseapp.com",
        databaseURL: "https://trainschedule-9946f.firebaseio.com",
        projectId: "trainschedule-9946f",
        storageBucket: "trainschedule-9946f.appspot.com",
        messagingSenderId: "360634120612"
    };

    firebase.initializeApp(config);

    var database = firebase.database();
    var trainName;
    var destination;
    var firstTrain;
    var frequency;
    var nextArrival;
    var minutesAway;
    var totalTimePassed;
    var timePassed;
    var row = 0;
    

    $("button").on("click", function(){

        event.preventDefault();

        trainName = $("#train_name").val();
        destination = $("#destination").val();
        firstTrain = $("#first_train").val();
        frequency = $("#frequency").val();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        })

        $("#train_name").val("");
        $("#destination").val("");
        $("#first_train").val("");
        $("#frequency").val("");

    })


    database.ref().on("child_added", function(snapshot){

        trainName = snapshot.val().trainName;
        destination = snapshot.val().destination;
        row = row + 1;
        
        firstTrain = moment((snapshot.val().firstTrain), "HH:mm");
        frequency = snapshot.val().frequency;

        totalTimePassed = moment().diff(moment(firstTrain), "minutes");
        timePassed = totalTimePassed % frequency;
        minutesAway = frequency - timePassed;
        nextArrival = moment().add(minutesAway, "minutes").format("HH:mm A");

        var newTrainAdded = `
            <tr>
                <th scope="row">${row}</th>
                <td>${trainName}</td>
                <td>${destination}</td>
                <td>${frequency}</td>
                <td>${nextArrival}</td>
                <td>${minutesAway}</td>
            </tr>
            `

        $("table").append(newTrainAdded);
    })
      


})