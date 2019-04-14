/* This script powers all things related to the Google Maps API. Generally speaking...
   DO NOT TOUCH ANY OF THESE VALUES UNLESS YOU ARE FAMILIAR WITH THE API AND YOU KNOW WHAT YOU ARE DOING. */

var x = 1;
var i = 1;
var s = 1;
var myLatLng = {
    lat: 0.0,
    lng: 0.0
};
var mapOptions = {
    center: {lat: 53.229702, lng: -4.123974},
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

// Hide result box
document.getElementById("results").style.display = "none";

// Create/Init map
var map = new google.maps.Map(document.getElementById('map'), mapOptions);
//var list = document.getElementById('resultlist');

// Create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Define calcRoute function
function calcRoute() {
    //create request
    if (document.getElementById("location-" + i).value == "" || document.getElementById("destination-1").value == "") {
        alert("Please Enter Two Locations");
    } else {
        do {
            routing();
        } while (i <= x)

    }
}

function routing() {
    var request = {
        origin: document.getElementById("location-" + i).value,
        destination: document.getElementById("destination-1").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    // Routing
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            //Get distance and time   
            document.getElementById("results").style.display = "block";
            var resultText = result.routes[0].legs[0].start_address + " to " + result.routes[0].legs[0].end_address + " is " + result.routes[0].legs[0].distance.text + " and will take " + result.routes[0].legs[0].duration.text;
            //Display Route
            directionsDisplay.setDirections(result);
            //Add Results
            var li = document.createElement("li");
            li.id = "loc" + i;
            li.innerHTML = resultText;
            document.getElementById("resultlist").appendChild(li);
            
        } else {
            alert("Can't find Address! Please try again!");
        }
    });
    ++i;
}

// Google Maps Autocomplete

var options = {
    componentRestrictions: {
        country: "UK"
    }
}

function autoComp() {
    var input1 = document.getElementById("location-" + x);
    var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
    var input2 = document.getElementById("destination-1");
    var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
}

autoComp();