
var firebaseConfig = {
    apiKey: "AIzaSyBfeD_AwwxpIEgFDT0pglnX884UdptW10A",
    authDomain: "trainscheduler-1e51a.firebaseapp.com",
    databaseURL: "https://trainscheduler-1e51a.firebaseio.com",
    projectId: "trainscheduler-1e51a",
    storageBucket: "trainscheduler-1e51a.appspot.com",
    messagingSenderId: "1098461297601",
    appId: "1:1098461297601:web:26dc4b779ad273e6a78d40",
    measurementId: "G-P2EBDCZLN6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function () {

    var database = firebase.database();

    //Updates Train Schedule table everytime a new entry is added
    database.ref().on("child_added", function (Snapshot) {

        // let today = new Date();
        // let time = today.getHours() + ":" + today.getMinutes();

        let nextArrival = "";
        let minAway = "";


        var newTrain = $("<tr>").append(
            $("<td>").text(Snapshot.val().trainName),
            $("<td>").text(Snapshot.val().destination),
            $("<td>").text(Snapshot.val().frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minAway)
        );

        $("#trainTable > tbody").append(newTrain);
    });

    //variables for html elements
    const $nameInput = $("#nameInput");
    const $destInput = $("#destInput");
    const $firstTimeInput = $("#firstTimeInput");
    const $freqInput = $("#freqInput");

    //Submit button for new trains
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();

        //Adds the 4 fields into the firebase root collection
        database.ref().push({
            trainName: $nameInput.val().trim(),
            destination: $destInput.val().trim(),
            firstTrainTime: $firstTimeInput.val().trim(),
            frequency: $freqInput.val().trim()
        });

    });




});