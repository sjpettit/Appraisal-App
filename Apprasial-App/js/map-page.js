



(function () {
window.mapPage = function(){

  var leftPage1 = this;

  mapPAge.getMapPage = function(myApp, mainView){


    var map;

$$(document).on('touchend', '.show-marker', function(e){

    if(prevOrderDiv){
        prevOrderDiv.children[0].className = "item-content item-link show-marker";
        if(prevOrderDiv == document.getElementById("li-"+this.id)){

            $.ajax({
              url: 'http://localhost:3000/api/v1/formData?orderID='+orderID+'&apiKey=ffa13b8d-de71-4c73-a48d-1bcb56bc2386',
            beforeSend: function(xhr) {
              myApp.showPreloader();
              xhr.overrideMimeType("text/plain; charset=x-user-defined");
            }
            }).done(function(data) {
              myApp.hidePreloader();
              if(JSON.parse(data).message == 'FORM'){
                form = JSON.parse(data).form;
                form = JSON.parse(form);
                 $("#city").val(form.city);
                 $("#state").val(form.state);

              }
            });
            leftView.loadPage('order-info.html');
            mainView.loadPage('tab-page.html');
        }
    }
    
    var currentOrder = currentOrderArray[this.id];
    var currId= this.id;
      $.ajax({
          url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+currentOrder.order_addres+", "+currentOrder.city+", "+currentOrder.state+'&key=AIzaSyBjm_gt77HZ8-aFj8DvnnVqTOyg54fNMFU',
            beforeSend: function(xhr) {
                myApp.showPreloader();
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
            }
      }).done(function(data) {
            myApp.hidePreloader();
           if(destinationMarker){
            destinationMarker.setMap(null);
           }
            geocodeData = JSON.parse(data).results;
            var myLatlng = new google.maps.LatLng(geocodeData[0].geometry.location.lat,geocodeData[0].geometry.location.lng);
            var image = 'img/MapMarker_Flag5_Chartreuse.png';
            destinationMarker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: image,
            title: 'Your Destination!'
           });
           destinationMarker.setMap(map);
           var request = {
                    origin: currentLocationMarker.position,
                    destination: destinationMarker.position,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                dirService.route(request, function(result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        drivingSteps = "<li>"+"<div class=\"item-content\">"+"<div class=\"item-inner\">"+"<div class=\"item-title\"> Driving Instructions </div></div></div></li>";
                        for(var i = 0; i<result.routes[0].legs[0].steps.length; i++){
                            drivingSteps = drivingSteps + "<li>"+"<div class=\"item-content\">"+"<div class=\"item-inner\">"+"<div class=\"item-text\">"+result.routes[0].legs[0].steps[i].instructions+"</div></div></div></li>";
                        }
                        document.getElementById('duration-'+currId).className="item-text";
                        document.getElementById('duration-'+currId).innerHTML="Driving Duration: "+convertTime(result.routes[0].legs[0].duration.value);
                        
                        dirRenderer.setDirections(result);
                    }
               });
        }).fail(function(err) {
           myApp.hidePreloader();
           console.log('error: '+err);
           //TODO add error function
        });
        document.getElementById(currId).className = "item-content item-link show-marker active-link";
        prevOrderDiv = document.getElementById("li-"+currId);
});


myApp.onPageAfterAnimation('map-page', function(page) {

 dirService = new google.maps.DirectionsService();
 dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});

var x = document.getElementById("demo");
    function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition,showError);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
    
    function showError(error) {
      switch(error.code) {
          case error.PERMISSION_DENIED:
              x.innerHTML = "User denied the request for Geolocation."
              break;
          case error.POSITION_UNAVAILABLE:
              x.innerHTML = "Location information is unavailable."
              break;
          case error.TIMEOUT:
              x.innerHTML = "The request to get user location timed out."
              break;
          case error.UNKNOWN_ERROR:
              x.innerHTML = "An unknown error occurred."
              break;
      }
    }


    function showPosition(position){ 
        var mapOptions = {
          center: { lat: position.coords.latitude, lng: position.coords.longitude},
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: true
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        dirRenderer.setMap(map);
        var myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        var image = 'img/MapMarker_Marker_Inside_Pink.png';
        currentLocationMarker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: image,
            title: 'You are Here!'
        });
        myApp.hidePreloader();
     }

      myApp.showPreloader();
      getLocation();

});



}
    }
})();
