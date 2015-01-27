var myApp = new Framework7({
    modalTitle: 'Framework7',
    animateNavBackIcon: true,
    swipeBackPage: false

});
// Expose Internal DOM library
var $$ = Dom7;

var mcServer = 'https://morning-caverns-8224.herokuapp.com';
//Declare global tracking variables
var userKey;
var orderArray;
var geocodeData;
var zipObjects;
var cityObjects;
var stateObjects;
var type;
var currentOrderArray;
var currentOrder;
var map;
//A
var panorama;
//A
var currentLocationMarker;
var destinationMarker;
var dirService;
var dirRenderer;
var drivingDistance;
var drivingDuration;
var prevOrderDiv;
var drivingSteps;
var tabTracking = 4; // variable tracking the last tab number 
var numOfTabs = 4; // constant for the number of tabs visible
var tabLength;
var orderID;
var firstName;
var lastName;
var sendData = {};
var listStatus = 0;
var formsToLoad;
var widgetStatus = {
    status: 'hidden',
    returnLeft: 0,
    returnTop: 0
}

//initalize login
login();
// Add main view
var mainView = myApp.addView('.view-main', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});
var leftView = myApp.addView('.view-left', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});




function getStateObjects(orderArr) {
    var stateObjectArray = new Array();
    var tempStateArray = new Array();
    var stateIndex = -1;
    for (var i = 0; i < orderArr.length; i++) {
        stateIndex = tempStateArray.indexOf(orderArr[i].state);
        if (stateObjectArray.length > 0 && stateIndex != -1) {
            stateObjectArray[stateIndex].stateOrderArray.push(orderArr[i]);
        } else {
            stateObjectArray.push({
                state: "" + orderArr[i].state,
                stateOrderArray: new Array()
            });
            stateObjectArray[stateObjectArray.length - 1].stateOrderArray.push(orderArr[i]);
            tempStateArray.push(orderArr[i].state);
        }
    }
    return stateObjectArray;
}

function getZipObjects(orderArr) {
    var zipObjectArray = new Array();
    var tempZipArray = new Array();
    var zipIndex = -1;
    for (var i = 0; i < orderArr.length; i++) {
        zipIndex = tempZipArray.indexOf(orderArr[i].zip);
        if (zipObjectArray.length > 0 && zipIndex != -1) {
            zipObjectArray[zipIndex].zipOrderArray.push(orderArr[i]);
        } else {
            zipObjectArray.push({
                zip: "" + orderArr[i].zip,
                zipOrderArray: new Array()
            });
            zipObjectArray[zipObjectArray.length - 1].zipOrderArray.push(orderArr[i]);
            tempZipArray.push(orderArr[i].zip);
        }
    }
    return zipObjectArray;
}

function getCityObjects(orderArr) {
    var cityObjectArray = new Array();
    var tempCityArray = new Array();
    var cityIndex = -1;
    for (var i = 0; i < orderArr.length; i++) {
        cityIndex = tempCityArray.indexOf(orderArr[i].city + ", " + orderArr[i].state);
        if (cityObjectArray.length > 0 && cityIndex != -1) {
            cityObjectArray[cityIndex].cityOrderArray.push(orderArr[i]);
        } else {
            cityObjectArray.push({
                city: orderArr[i].city + ", " + orderArr[i].state,
                cityOrderArray: new Array()
            });
            cityObjectArray[cityObjectArray.length - 1].cityOrderArray.push(orderArr[i]);
            tempCityArray.push(orderArr[i].city + ", " + orderArr[i].state);
        }
    }
    return cityObjectArray;
}

function printAllOrders() {
    var pluralityString;
    if (orderArray.length > 1 || orderArray.length == 0) {
        pluralityString = " Orders";
    } else if (orderArray.length == 1) {
        pluralityString = " Order";
    }
    $('#group-list').append(
        "<li class=\"accordion-item\">" +
        "<a href='#' id=\"0\" class=\"item-content item-link\">" +
        "<div class=\"item-inner\">" +
        "<div class=\"item-title\">All Orders<div class='item-subtitle' style='color:gray;'>" + orderArray.length +
        pluralityString + " Found</div></div>" +
        /*"<div class=\"order-ammount\">"+orderArray.length+
        pluralityString+" Found<\div>"+*/
        "</div>" +
        "</a>" +
        '<div class="accordion-item-content">' +
        '<div class="content-block">' +
        '<ul id = "accordion-0">' +
        '</ul>' +
        '</div>' +
        '</div>' +
        "</li>"
    )
    var ordersToLoad = orderArray;
    loadOrders2(ordersToLoad, 'all', 0);


    if (orderArray.length == 0) {
        $("#0").removeClass("item-link");
        $("#0").removeClass("load-orders");
    }
}

function convertTime(time) {
    var minutes = 0;
    var hours = 0;
    var timeString = "";
    if (time > 60) {
        minutes = time / 60;
    }
    if (minutes > 60) {
        hours = minutes / 60
    }
    var seconds;
    var minPlurality = " minutes";
    var secondPlurality = " seconds";
    var hourPlurality = " hours";
    if (seconds < 2 && seconds >= 1) {
        secondPlurality = " second";
    }
    seconds = time;
    timeString = seconds + secondPlurality;

    if (minutes > 0) {
        seconds = (minutes % 1) * 60;
        if (minutes < 2 && minutes >= 1) {
            minPlurality = " minute";
        }
        if (seconds < 2 && seconds >= 1) {
            secondPlurality = " second";
        }
        timeString = minutes.toString().split(".")[0] + minPlurality + " ";
        timeString = timeString + seconds.toString().split(".")[0] + secondPlurality;
    }
    if (hours > 0) {
        minutes = (hours % 1) * 60;
        if (minutes < 2 && minutes >= 1) {
            minPlurality = " minute";
        }
        if (hours < 2 && hours >= 1) {
            hourPlurality = " hour";
        }
        timeString = hours.toString().split(".")[0] + hourPlurality + " ";
        timeString = timeString + minutes.toString().split(".")[0] + minPlurality + " ";
        timeString = timeString + seconds.toString().split(".")[0] + secondPlurality;
    }

    return timeString
}

$$(document).on('click', '.load-orders', function(e) {
    leftView.loadPage('order-page.html');
    mainView.loadPage('map-page.html');
    $("#tool-icon-1").addClass("hidden");
    $("#tool-icon-1").removeClass("tab-link");
    $("#tool-icon-2").addClass("hidden");
    $("#tool-icon-2").removeClass("tab-link");
    $("#tool-icon-3").addClass("hidden");
    $("#tool-icon-3").removeClass("tab-link");


    console.log(type);
    var orderToLoad;
    console.log(this.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].id);
    if (type == 'zip') {
        var ordersToLoad = zipObjects[this.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].id].zipOrderArray;
        orderToLoad = ordersToLoad[this.id];
        loadOrder(orderToLoad);
    } else if (type == 'state') {
        var ordersToLoad = stateObjects[this.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].id].stateOrderArray;
        orderToLoad = ordersToLoad[this.id];
        loadOrder(orderToLoad);
    } else if (type == 'city') {
        var ordersToLoad = cityObjects[this.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].id].cityOrderArray;
        var orderToLoad = ordersToLoad[this.id];
        loadOrder(orderToLoad);
    } else if (type == 'all') {
        var ordersToLoad = orderArray;
        orderToLoad = ordersToLoad[this.id];
        loadOrder(orderToLoad);
    }
    currentOrder = orderToLoad;
    currentOrderArray = ordersToLoad;

});




/*
function loadOrders(ordersToLoad){

  myApp.onPageAfterAnimation('order-page', function(page) {
      $('#back-button').removeClass("invisible");
      $('#order-list').html("");
                    for(var i = 0;i<ordersToLoad.length;i++){
                      $('#order-list').append(               
                        "<li id=li-"+i+">"+
                        "<div id="+i+" class=\"item-content item-link show-marker\">"+
                          "<div class=\"item-inner\">"+
                            "<div class=\"item-title-row\">"+
                                "<div class=\"item-title\"> Order "+ordersToLoad[i].orderID+"</div>"+ 
                            "</div>"+
                            "<div class=\"item-subtitle\">  Due Date: "+ordersToLoad[i].order_due_date+"</div>"+
                            "<div class=\"item-subtitle\">  Address: "+ordersToLoad[i].order_addres+"</div>"+
                            "<div class=\"item-subtitle\">  City: "+ordersToLoad[i].city+", "+ordersToLoad[i].state+ "</div>"+
                            "<div class=\"item-subtitle\">  Phone: <a href='#' class='phone-number'>"+ordersToLoad[i].contact_no+"</a></div>"+
                            "<div class=\"item-subtitle\">  Party Name: "+ordersToLoad[i].order_party_name+"</div>"+
                            "<div id=\"distance-"+i+"\"class=\"\"></div>"+
                            "<div id=\"duration-"+i+"\"class=\"\"></div>"+
                          "</div>"+    
                        "</li>"
                      )
                    
                      }
              
  });
}*/

function loadOrder(orderToLoad) {
    myApp.onPageAfterAnimation('order-page', function(page) {
        $('#back-button').removeClass("invisible");
        $('#order-list').html("");
        $('#order-list').append(
            "<li id=li-" + 0 + ">" +
            "<div id=" + 0 + " class=\"item-content item-link show-marker\">" +
            "<div class=\"item-inner\">" +
            "<div class=\"item-title-row\">" +
            "<div class=\"item-title\"> Order " + orderToLoad.orderID + "</div>" +
            "</div>" +
            "<div class=\"item-subtitle\">  Due Date: " + orderToLoad.order_due_date + "</div>" +
            "<div class=\"item-subtitle\">  Address: " + orderToLoad.order_addres + "</div>" +
            "<div class=\"item-subtitle\">  City: " + orderToLoad.city + ", " + orderToLoad.state + "</div>" +
            "<div class=\"item-subtitle\">  Phone: <a href='#' class='phone-number'>" + orderToLoad.contact_no + "</a></div>" +
            "<div class=\"item-subtitle\">  Party Name: " + orderToLoad.order_party_name + "</div>" +
            "<div id=\"distance-" + 0 + "\"class=\"\"></div>" +
            "<div id=\"duration-" + 0 + "\"class=\"\"></div>" +
            "</div>" +
            "</li>"
        )
    });
}

function loadOrders2(ordersToLoad, orderType, i) {
    type = orderType;
    for (var j = 0; j < ordersToLoad.length; j++) {
        $('#accordion-' + i).append(
            "<li id=li-" + j + ">" +
            "<div id=" + j + " class=\"item-content item-link to-map load-orders\">" +
            "<div class=\"item-inner\">" +
            "<div class=\"item-title-row\">" +
            "<div class=\"item-title\"> Order " + ordersToLoad[j].orderID + "</div>" +
            "</div>" +
            "<div class=\"item-subtitle\">  Due Date: " + ordersToLoad[j].order_due_date + "</div>" +
            /*"<div class=\"item-subtitle\">  Address: "+ordersToLoad[j].order_addres+"</div>"+
            "<div class=\"item-subtitle\">  City: "+ordersToLoad[j].city+", "+ordersToLoad[j].state+ "</div>"+
            "<div class=\"item-subtitle\">  Phone: <a href='#' class='phone-number'>"+ordersToLoad[j].contact_no+"</a></div>"+
            "<div class=\"item-subtitle\">  Party Name: "+ordersToLoad[j].order_party_name+"</div>"+
            "<div id=\"distance-"+j+"\"class=\"\"></div>"+
            "<div id=\"duration-"+j+"\"class=\"\"></div>"+*/
            "</div>" +
            "</li>"
        )
    }


}



$$('.back').on('click', function(e) {
    $('.save').addClass("hidden");
    $('.submit').addClass("hidden");
    $('.send-back').addClass("hidden");
    $('.save').removeClass("link");
    $('.submit').removeClass("link");
    $('.send-back').removeClass("link");
    $('#widget-bar').css('display', 'hidden');
    $('#widget-bar').css('animation', '');
    $('#map-container').addClass('map-container-without-widgets');
    $('#map-container').removeClass('map-container-with-widgets');
    leftView.goBack();
    tabTracking = numOfTabs;
});

$$(document).on('click', '.prev', function(e) {
    if ($(".next").hasClass("invisible")) {
        $(".next").removeClass("invisible");
        $(".next").addClass("link");

    }
    if (tabTracking > 4) {
        $("#tab-icon-" + tabTracking).addClass("hidden");
        $("#tab-icon-" + tabTracking).removeClass("tab-link");
        $("#tab-icon-" + (tabTracking - numOfTabs)).addClass("tab-link");
        $("#tab-icon-" + (tabTracking - numOfTabs)).removeClass("hidden");
        tabTracking--;
        if (tabTracking == numOfTabs) {
            $(".prev").removeClass("link");
            $(".prev").addClass("invisible");
        }
    }
});

$$(document).on('click', '.next', function(e) {

    if ($(".prev").hasClass("invisible")) {
        $(".prev").removeClass("invisible");
        $(".prev").addClass("link");
    }
    if (tabTracking <= tabLength) {
        tabTracking++;
        $("#tab-icon-" + (tabTracking - numOfTabs)).removeClass("tab-link");
        $("#tab-icon-" + (tabTracking - numOfTabs)).addClass("hidden");
        $("#tab-icon-" + tabTracking).removeClass("hidden");
        $("#tab-icon-" + tabTracking).addClass("tab-link");
        if (tabTracking == tabLength) {
            $(".next").removeClass("link");
            $(".next").addClass("invisible");
        }
    }

    $$(document).on('click', '.tab-link', function(e) {
        $(".hidden.active").not('.tool-link').removeClass("active");
    });

});



myApp.onPageAfterAnimation('order-info', function(page) {
    prevOrderDiv.children[0].className = "item-content";
    $('.save').removeClass("hidden");
    $('.submit').removeClass("hidden");
    $('.send-back').removeClass("hidden");
    $('.save').addClass("link");
    $('.submit').addClass("link");
    $('.send-back').addClass("link");
    $('#order-info').append(prevOrderDiv);
    $('#order-info').append(drivingSteps);

});


tabPage = new tabPage({});
tabPage.getTabPage();



/////////
$$(document).on('click', '.save', function(e) {
    sendData.formData = JSON.stringify(ko.mapping.toJS(viewModel));

    $.ajax({
        url: mcServer + '/api/v1/formData?orderID=' + orderID + '&apiKey=f5812148-64e5-45d1-9f44-ce51b5a9b741',
        contentType: 'application/json',
        type: "POST",
        data: JSON.stringify(sendData),
        beforeSend: function(xhr) {
            myApp.showPreloader();
        }
    }).done(function(data) {
        myApp.hidePreloader();
    });
});


$$(document).on('click', '.submit', function(e) {

    var validate = validateAllTabsByClass();
    //console.log(validate);

    if (validateAllTabsByClass()) {
        var signatureModal = myApp.modal({
            title: "Signature",
            text: '<iframe id="iframe-sig" src="signature-pad-iframe.html" scrolling="no" style="width:100%; height:100%"></iframe>',
            buttons: [{
                text: 'Cancel',
                onClick: function() {
                    var iframe = document.getElementById('iframe-sig');
                    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                    var canvas = innerDoc.getElementById('real-canvas');
                    /*viewModel.appraiserSignature = ko.observable(canvas.toDataURL());
            ko.cleanNode($('#signature')[0]);
            ko.applyBindings(viewModel, $('#signature')[0]);*/
                }
            }, {
                text: 'Clear',
                close: false,
                onClick: function() {
                    document.getElementById('iframe-sig').contentDocument.location.reload(true);
                }
            }, {
                text: 'Submit',
                bold: true,
                onClick: function() {
                    var iframe = document.getElementById('iframe-sig');
                    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                    var canvas = innerDoc.getElementById('real-canvas');
                    viewModel.appraiserSignature = ko.observable(canvas.toDataURL());
                    ko.cleanNode($('#signature')[0]);
                    ko.applyBindings(viewModel, $('#signature')[0]);
                    sendData.formData = JSON.stringify(ko.mapping.toJS(viewModel));
                    sendData.orderStatus = 2;
                    $.ajax({
                        url: mcServer + '/api/v1/formData?orderID=' + orderID + '&apiKey=f5812148-64e5-45d1-9f44-ce51b5a9b741',
                        contentType: 'application/json',
                        type: "POST",
                        data: JSON.stringify(sendData),
                        beforeSend: function(xhr) {
                            myApp.showPreloader();
                        }
                    }).done(function(data) {
                        myApp.hidePreloader();
                        mainView.loadPage('main-page-1.html');
                        leftView.loadPage('left-page-1.html');
                    });


                    $('.save').addClass("hidden");
                    $('.submit').addClass("hidden");
                    $('.send-back').addClass("hidden");
                    $('.save').removeClass("link");
                    $('.submit').removeClass("link");
                    $('.send-back').removeClass("link");

                    tabTracking = numOfTabs;
                }
            }, ],
        });

        $('.modal').css({
            "width": "70%",
            "margin": "auto",
            "left": "0",
            "right": "0",
            "bottom": "0",
            "top": "0",
            "height": "50%"
        });
        $('.modal-text').css("height", "100%");
    }
});


$$(document).on('click', '.send-back', function(e) {
    var data = {};
    data.city = $("#city").val();
    data.state = $("#state").val();
    sendData.formData = JSON.stringify(data);
    sendData.orderStatus = 1;
    $.ajax({
        url: mcServer + '/api/v1/formData?orderID=' + orderID + '&apiKey=f5812148-64e5-45d1-9f44-ce51b5a9b741',
        contentType: 'application/json',
        type: "POST",
        data: JSON.stringify(sendData),
        beforeSend: function(xhr) {
            myApp.showPreloader();
        }
    }).done(function(data) {
        myApp.hidePreloader();
        mainView.loadPage('main-page-1.html');
        leftView.loadPage('left-page-1.html');
    });

    $('.save').addClass("hidden");
    $('.submit').addClass("hidden");
    $('.send-back').addClass("hidden");
    $('.save').removeClass("link");
    $('.submit').removeClass("link");
    $('.send-back').removeClass("link");

    tabTracking = numOfTabs;
});
///////////

$$(document).on('click', '.show-marker', function(e) {



    if (prevOrderDiv) {
        prevOrderDiv.children[0].className = "item-content item-link show-marker";
        //if (prevOrderDiv == document.getElementById("li-" + this.id)) {
            orderID = currentOrderArray[this.id].orderID;
            formsToLoad = currentOrderArray[this.id].forms;
            orderID = currentOrderArray[this.id].orderID;
            $.ajax({
                url: mcServer + '/api/v1/formData?orderID=' + orderID + '&apiKey=ffa13b8d-de71-4c73-a48d-1bcb56bc2386',
                beforeSend: function(xhr) {
                    myApp.showPreloader();
                    xhr.overrideMimeType("text/plain; charset=x-user-defined");
                }
            }).done(function(data) {
                //myApp.hidePreloader();
                viewModel = resetViewModel();
                if (JSON.parse(data).message == 'FORM') {
                    form = JSON.parse(data).form;
                    form = JSON.parse(form);

                    if (form.hasOwnProperty('subjectCity')) {
                        var mapModel = ko.mapping.fromJS(form);
                        for (var property in viewModel) {

                            if (mapModel.hasOwnProperty(property) && property != '__ko_mapping__') {
                                viewModel[property] = mapModel[property];
                            }
                        }
                    }
                }
                //console.log(ko.mapping.toJS(viewModel));
                $('#widget-bar').css('display', 'none');
                $('#widget-bar').css('animation', 'none');
                leftView.loadPage('order-info.html');
                mainView.loadPage('tab-page.html');
            });

        //}
    }


});


myApp.onPageAfterAnimation('map-page', function(page) {

    dirService = new google.maps.DirectionsService();
    dirRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });

    var x = document.getElementById("demo");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showError(error) {
        switch (error.code) {
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


    function showPosition(position) {
        var mapOptions = {

            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            zoom: 15,
            disableDefaultUI: true,
            zoomControl: true,
            //A 
            streetViewControl: false
                //A
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        dirRenderer.setMap(map);


        var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var image = 'img/MapMarker_Marker_Inside_Pink.png';
        currentLocationMarker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: image,
            title: 'You are Here!'
        });

      $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + currentOrder.order_addres + ", " + currentOrder.city + ", " + currentOrder.state + '&key=AIzaSyBjm_gt77HZ8-aFj8DvnnVqTOyg54fNMFU',
        beforeSend: function(xhr) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }
    }).done(function(data) {
        if (destinationMarker) {
            destinationMarker.setMap(null);
        }
        geocodeData = JSON.parse(data).results;
        var myLatlng = new google.maps.LatLng(geocodeData[0].geometry.location.lat, geocodeData[0].geometry.location.lng);
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
                drivingSteps = "<li>" + "<div class=\"item-content\">" + "<div class=\"item-inner\">" + "<div class=\"item-title\"> Driving Instructions </div></div></div></li>";
                for (var i = 0; i < result.routes[0].legs[0].steps.length; i++) {
                    drivingSteps = drivingSteps + "<li>" + "<div class=\"item-content\">" + "<div class=\"item-inner\">" + "<div class=\"item-text\">" + result.routes[0].legs[0].steps[i].instructions + "</div></div></div></li>";
                }
                document.getElementById('duration-' + currId).className = "item-text";
                document.getElementById('duration-' + currId).innerHTML = "Driving Duration: " + convertTime(result.routes[0].legs[0].duration.value);

                dirRenderer.setDirections(result);
            }
        });

        //A
        var streetViewCheck = new google.maps.StreetViewService();
        streetViewCheck.getPanoramaByLocation(myLatlng, 50, function(result, status) {
            panorama = map.getStreetView();
            panorama.setVisible(false);

            if (status === google.maps.StreetViewStatus.OK) {
                panorama.setPosition(myLatlng);
                panorama.setPov({
                        heading: 265,
                        pitch: 0
                    })
                    //A
                    //A

                google.maps.event.addListener(destinationMarker, 'click', function() {
                    panorama.setVisible(true);
                });
            } else {
                google.maps.event.addListener(destinationMarker, 'click', function() {
                    myApp.alert('No street view available', '');
                });
            }
        });
        //A
        mapDeffered.resolve();

    }).fail(function(err) {
        console.log('error: ' + err);
        //TODO add error function
    });
///////

//////
        myApp.hidePreloader();
    }

    myApp.showPreloader();
    getLocation();

    $('#widget-bar').css('display', 'inline-block');
    $('#widget-bar').css('animation', 'pageFromRightToCenter 400ms forwards');
    $('#map-container').removeClass('map-container-without-widgets');
    $('#map-container').addClass('map-container-with-widgets');
    $('#widget-popup-container').hide();
    $('#zillow-widget').unbind();
    $('#avm-widget').unbind();
    $('#fraud-guard-widget').unbind();
    //var currentOrder = currentOrderArray[0];
    var currId = 0;

    var zillowKey = "X1-ZWz1dzospff763_1y8f9";
    var jsonReturned = '';
    //Test Data
    /*currentOrder.order_addres="2114 Bigelow Ave",
  currentOrder.city="Seattle";
  currentOrder.state="WA";*/
    ///////////////
    //Build query using YQL(Yahoo Query Language)
    //console.log(currentOrder.city);
    var yqlUrl = 'http://query.yahooapis.com/v1/public/yql?q=' +
        //encodeURIComponent("select * from xml where url='http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id="+zillowKey+"&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA'")+
        encodeURIComponent("select * from xml where url='http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=" + zillowKey +
            "&address=" + (currentOrder.order_addres.split(' ').join('+')) + "&citystatezip=" + (currentOrder.city.split(' ').join('+')) + "%2C+" + currentOrder.state + "'") +
        '&diagnostics=true';

    var zillowDeffered = new $.Deferred();
    var zillowPicDeffered = new $.Deferred();
    var mapDeffered = new $.Deferred();

    $('#zillow-order-information').empty();
    myApp.showPreloader();

    $.ajax({
        url: yqlUrl,
        dataType: "xml",
        success: function(data) {
            //console.log(data);

            //console.log($.xml2json(data));
            jsonReturned = jQuery.xml2json(data);
            //console.log(jsonReturned);
            var zillowPopupHTML = '';
            if (jsonReturned.results.searchresults.message.code == "0") {
                var jsonRequest = jsonReturned.results.searchresults.response.results.result;
                var propertyImage = '';
                var yqlPictureUrl = 'http://query.yahooapis.com/v1/public/yql?q=' +
                    encodeURIComponent("select * from xml where url='http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=" + zillowKey +
                        "&zpid=" + jsonRequest.zpid + "'") + '&diagnostics=true';
                var jsonPictureReturned = '';
                $.ajax({
                    url: yqlPictureUrl,
                    dataType: "xml",
                    success: function(data) {
                        jsonPictureReturned = jQuery.xml2json(data);
                        //console.log(jsonPictureReturned);
                    },
                    error: function() {
                        'Unable to connect to Zillow'
                    },
                }).done(function() {
                    var jsonPictureRequest = jsonPictureReturned.results.updatedPropertyDetails.response;
                    if (jsonPictureReturned.results.updatedPropertyDetails.message.code == "0") {
                        //console.log(jsonPictureRequest.images.image.url);
                        propertyImage = '<image src="' + jsonPictureRequest.images.image.url + '" />';
                    } else {
                        propertyImage = '';
                    }
                    zillowPopupHTML = '<div class="content-block">' +
                        '<center><a href="http://www.zillow.com" target="_blank"><img src="http://www.zillow.com/widgets/GetVersionedResource.htm?path=/static/logos/Zillowlogo_200x50.gif" width="200" height="50" alt="Zillow Real Estate Search" /></a></center>' +
                        '<ul>' +
                        ((jsonRequest.finishedSqFt) ? ('<li>Finished Sqare Footage: ' + jsonRequest.finishedSqFt + '</li>') : '') +
                        ((jsonRequest.totalRooms) ? ('<li>Total Rooms: ' + jsonRequest.totalRooms + '</li>') : '') +
                        ((jsonRequest.bedrooms) ? ('<li>Bedrooms: ' + jsonRequest.bedrooms + '</li>') : '') +
                        ((jsonRequest.bathrooms) ? ('<li>Bathrooms: ' + jsonRequest.bathrooms + '</li>') : '') +
                        ((jsonRequest.lastSoldPrice && '$' + jsonRequest.lastSoldPrice.text) ? ('<li>Last sold price: ' + jsonRequest.lastSoldPrice.text + '</li>') : '') +
                        ((jsonRequest.lastSoldDate) ? ('<li>Last sold date: ' + jsonRequest.lastSoldDate + '</li>') : '') +
                        ((jsonRequest.taxAssessment) ? ('<li>Tax Assessment: ' + '$' + jsonRequest.taxAssessment + '</li>') : '') +
                        ((jsonRequest.taxAssessmentDate) ? ('<li>Tax Assessment Year: ' + jsonRequest.taxAssessmentDate + '</li>') : '') +
                        '</ul>' +
                        '<center>' + propertyImage + '</center>' +
                        '<center>See more details for <a href="' + jsonRequest.links.homedetails + '" style="color:blue;">' + currentOrder.order_addres + '</a> on Zillow</center>' +
                        '</div>';

                    $('#zillow-widget').click(function() {
                        createWidgetPopup(zillowPopupHTML, 'zillow-widget');
                        //myApp.popup(popupHTML);
                    });
                    var avmPopupHTML = '<div class="widget-popup ">' +
                        '<div class="content-block">' +
                        '<center>AVM</center>' +
                        '<center>AVM widget not available in this package</center>' +
                        '</div>' +
                        '</div>';
                    $('#avm-widget').click(function() {
                        createWidgetPopup(avmPopupHTML, 'avm-widget');
                    });
                    var fgPopupHTML = '<div class="widget-popup ">' +
                        '<div class="content-block">' +
                        '<center>Fraud Guard</center>' +
                        '<center>Fraud Guard widget not available in this package</center>' +
                        '</div>' +
                        '</div>';
                    $('#fraud-guard-widget').click(function() {
                        createWidgetPopup(fgPopupHTML, 'fraud-guard-widget');
                    });
                });
            } else {
                zillowPopupHTML = '<div class="widget-popup ">' +
                    '<div class="content-block">' +
                    '<center><a href="http://www.zillow.com" target="_blank"><img src="http://www.zillow.com/widgets/GetVersionedResource.htm?path=/static/logos/Zillowlogo_200x50.gif" width="200" height="50" alt="Zillow Real Estate Search" /></a></center>' +
                    '<center>There is no Zillow information for this address</center>' +
                    '</div>' +
                    '</div>';
                $('#zillow-widget').click(function() {
                    createWidgetPopup(zillowPopupHTML, 'zillow-widget');
                });
                var avmPopupHTML = '<div class="widget-popup ">' +
                    '<div class="content-block">' +
                    '<center>AVM</center>' +
                    '<center>AVM widget not available in this package</center>' +
                    '</div>' +
                    '</div>';
                $('#avm-widget').click(function() {
                    createWidgetPopup(avmPopupHTML, 'avm-widget');
                });
                var fgPopupHTML = '<div class="widget-popup ">' +
                    '<div class="content-block">' +
                    '<center>Fraud Guard</center>' +
                    '<center>Fraud Guard widget not available in this package</center>' +
                    '</div>' +
                    '</div>';
                $('#fraud-guard-widget').click(function() {
                    createWidgetPopup(fgPopupHTML, 'fraud-guard-widget');
                });
            }
            zillowPicDeffered.resolve();
        },
        error: function() {
            'Unable to connect to Zillow'
        },
    }).done(function() {
        zillowDeffered.resolve();
    });



    $.when(zillowDeffered, zillowPicDeffered, mapDeffered).done(function() {
        myApp.hidePreloader();
    });
    document.getElementById(currId).className = "item-content item-link show-marker active-link";
    prevOrderDiv = document.getElementById("li-" + currId);

});



leftPage1 = new leftPage1({});
leftPage1.getLeftPage1(myApp, mainView);




myApp.onPageInit('main-page-1', function(page) {
    // Add views
    document.getElementById('view-left').className = "view view-left navbar-through toolbar-through"
    document.getElementById('view-main').className = "view view-main navbar-through toolbar-through frame-shift"
    document.getElementById('view-navbar').className = "view view-navbar";
    document.getElementById('view-toolbar').className = "view view-toolbar";
    $.ajax({
            url: mcServer + '/api/v1/getOrderDetail?orderPartyID=' + userKey + '&apiKey=1dca7720-395c-11e4-916c-0800200c9a66&orderStatus=' + listStatus,
            dataType: "text",
            beforeSend: function(xhr) {
                myApp.showPreloader();
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
            }
        })
        .done(function(data) {
            myApp.hidePreloader();
            orderArray = JSON.parse(data).data;
            if (orderArray == 'NO-ORDER-FOUND') {
                orderArray = [];

            } else {

            }
            printAllOrders();
            //$(".welcome").html("<i class=\"icon icon-user\"></i> ");

            $("#state").change(function(event) {
                if (!this.checked && !$('#zip').checked && !$('#city').checked) {
                    $('#group-list').html("");
                }
                if (this.checked) {
                    $('#city').attr('checked', false);
                    $('#zip').attr('checked', false);
                    $('#group-list').html("");
                    stateObjects = getStateObjects(orderArray);
                    for (var i = 0; i < stateObjects.length; i++) {
                        var pluralityString;
                        if (stateObjects[i].stateOrderArray.length > 1) {
                            pluralityString = " Orders";
                        } else {
                            pluralityString = " Order";
                        }
                        $('#group-list').append(
                            "<li class=\"accordion-item\">" +
                            "<a href='#' id=" + i + " class=\"item-content item-link\">" +
                            "<div class=\"item-inner\">" +
                            "<div class=\"item-title\">" + stateObjects[i].state + "<div class='item-subtitle' style='color:gray;'>" + stateObjects[i].stateOrderArray.length +
                            pluralityString + " Found</div></div>" +




                            /* 
                            "<div class=\"order-ammount\">"+stateObjects[i].stateOrderArray.length+
                             pluralityString+" Found<\div>"+*/
                            "</div>" +
                            "</a>" +

                            '<div class="accordion-item-content">' +
                            '<div class="content-block">' +
                            '<ul id = "accordion-' + i + '">' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            "</li>"
                        )
                        var ordersToLoad = stateObjects[i].stateOrderArray;
                        loadOrders2(ordersToLoad, 'state', i);


                    }
                } else {
                    printAllOrders();
                }

            });

            $("#city").change(function(event) {
                if (!this.checked && !$('#zip').checked && !$('#state').checked) {
                    $('#group-list').html("");
                }
                if (this.checked) {
                    $('#state').attr('checked', false);
                    $('#zip').attr('checked', false);
                    $('#group-list').html("");
                    cityObjects = getCityObjects(orderArray);
                    for (var i = 0; i < cityObjects.length; i++) {
                        var pluralityString;
                        if (cityObjects[i].cityOrderArray.length > 1) {
                            pluralityString = " Orders";
                        } else {
                            pluralityString = " Order";
                        }
                        $('#group-list').append(
                            "<li class=\"accordion-item\">" +
                            "<a href='#' id=" + i + " class=\"item-content item-link \">" +
                            "<div class=\"item-inner\">" +
                            "<div class=\"item-title\">" + cityObjects[i].city + "<div class='item-subtitle' style='color:gray;'>" + cityObjects[i].cityOrderArray.length +
                            pluralityString + " Found</div></div>" +
                            /*
                                                              
                            "<div class=\"order-ammount\">"+cityObjects[i].cityOrderArray.length+
                            pluralityString+" Found<\div>"+*/
                            "</div>" +
                            "</a>" +
                            '<div class="accordion-item-content">' +
                            '<div class="content-block">' +
                            '<ul id = "accordion-' + i + '">' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            "</li>")
                        var ordersToLoad = cityObjects[i].cityOrderArray;
                        loadOrders2(ordersToLoad, 'city', i);
                    }
                } else {
                    printAllOrders();
                }
            });

            $("#zip").change(function(event) {
                if (!this.checked && !$('#state').checked && !$('#city').checked) {
                    $('#group-list').html("");
                }
                if (this.checked) {
                    $('#city').attr('checked', false);
                    $('#state').attr('checked', false);
                    $('#group-list').html("");
                    zipObjects = getZipObjects(orderArray);
                    for (var i = 0; i < zipObjects.length; i++) {
                        var pluralityString;
                        if (zipObjects[i].zipOrderArray.length > 1) {
                            pluralityString = " Orders";
                        } else {
                            pluralityString = " Order";
                        }
                        $('#group-list').append(
                            "<li class=\"accordion-item\">" +
                            "<a href='#' id=" + i + " class=\"item-content item-link \">" +
                            "<div class=\"item-inner\">" +
                            "<div class=\"item-title\">" + zipObjects[i].zip + "<div class='item-subtitle' style='color:gray;'>" + zipObjects[i].zipOrderArray.length +
                            pluralityString + " Found</div></div>" +
                            /* 
                            "<div class=\"order-ammount\">"+zipObjects[i].zipOrderArray.length+
                             pluralityString+" Found<\div>"+*/
                            "</div>" +
                            "</a>" +

                            '<div class="accordion-item-content">' +
                            '<div class="content-block">' +
                            '<ul id = "accordion-' + i + '">' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            "</li>"
                        )
                        var ordersToLoad = zipObjects[i].zipOrderArray;
                        loadOrders2(ordersToLoad, 'zip', i);
                    }
                } else {
                    printAllOrders();
                }

            });
        }).fail(function(err) {
            myApp.alert('Server Connection Lost', 'Error:', function() {
                myApp.hidePreloader();
                //TODO: call logout
            });
        });

});

var indexAfterAnimation;
$('.logout').on('click', function(e) {
    if (indexAfterAnimation) {
        indexAfterAnimation.remove();
    }
    mainView.loadPage('index.html');
    $('.save').addClass("hidden");
    $('.submit').addClass("hidden");
    $('.send-back').addClass("hidden");
    $('.save').removeClass("link");
    $('.submit').removeClass("link");
    $('.send-back').removeClass("link");
    document.getElementById('view-left').className = "view view-left navbar-through toolbar-through hidden"
    document.getElementById('view-main').className = "view view-main navbar-through toolbar-through"
    document.getElementById('view-navbar').className = "view view-navbar hidden";
    document.getElementById('view-toolbar').className = "view view-toolbar hidden";
    myApp.hidePreloader();
    //window.location.href ='http://http://localhost:5000/apprasial-app/';
    tabTracking = numOfTabs;
    indexAfterAnimation = myApp.onPageAfterAnimation('index', function(page) {
        login();
        console.log("logout");
    });

});

myApp.onPageInit('*', function(page) {
    console.log(page.name + ' initialized');
});
/*myApp.onPageInit('index', function(page) {       
        $('.save').addClass("hidden");
        $('.submit').addClass("hidden");
        $('.send-back').addClass("hidden");
        $('.save').removeClass("link");
        $('.submit').removeClass("link");
        $('.send-back').removeClass("link");
        document.getElementById('view-left').className = "view view-left navbar-through toolbar-through hidden"
        document.getElementById('view-main').className = "view view-main navbar-through toolbar-through"
        document.getElementById('view-navbar').className = "view view-navbar hidden";
        document.getElementById('view-toolbar').className = "view view-toolbar hidden";
    });

*/



// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
/*$$(document).on('ajaxStart', function() {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function() {
    myApp.hideIndicator();

});*/
var xmlhttp;
if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
    }
}


/*$$(document).on('click', '.dropzone', function(e){
  $("#myDropzone").click();
});*/


function login() {
    console.log("login-modal");
    $$(".index-page").addClass(document.body.className);
    var modal = myApp.modalLogin('Enter your username and password', 'Login: ', function(username, password) {
        $.ajax({
                url: mcServer + "/api/v1/checkUserCredential?userName=" + username + '&password=' + password + '&apiKey=df5cb700-395b-11e4-916c-0800200c9a66',
                beforeSend: function(xhr) {
                    myApp.showPreloader();
                    xhr.overrideMimeType("text/plain; charset=x-user-defined");

                }
            })
            .done(function(data) {
                mainView.loadPage('main-page-1.html');
                leftView.loadPage('left-page-1.html');
                userKey = JSON.parse(data).data.id;
                firstName = JSON.parse(data).data.firstName;
                lastName = JSON.parse(data).data.lastName;

            }).fail(function(err) {

                if (err.status === 401) {
                    myApp.alert('Incorret User Name or Password', 'Error:', function() {
                        myApp.hidePreloader();
                        login();
                    });
                } else {
                    myApp.alert('Could not Connect to the Server', 'Error:', function() {
                        myApp.hidePreloader();
                        login();
                    });
                }
            });


    }, function(username, password) {
        login();
    });

}

function dropdownGrey(id) //Function to make 'Select' in the drop down lists grey and the rest of the list black
    {
        if (id == "form-select")
            return 0;

        if ($('#' + id).prop('selectedIndex') == 0) {
            $('#' + id).css("color", "grey");
            $(('#' + id) + '>option').each(function(i, element) {
                $(this).css("color", "black");
            });
            $('#' + id + '>option:eq(0)').css("color", "grey");
        } else {
            $('#' + id).css("color", "black");
            $(('#' + id) + '>option').each(function(i, element) {
                $(this).css("color", "black");
            });
            $('#' + id + '>option:eq(0)').css("color", "grey");
        }
    }

function dateGrey(id) {
    if ($('#' + id).val() == "") {
        $('#' + id).css("color", "grey");
    } else {
        $('#' + id).css("color", "black");
    }
}

function openPad() {
    var canvas = document.querySelector("canvas");
    var signaturePad = new SignaturePad(canvas, {
        backgroundColor: "rgb(255,255,255)"
    });
}

//From http://stackoverflow.com/questions/3163615/how-to-scroll-html-page-to-given-anchor-using-jquery-or-javascript
function scrollTo(hash) {
    //console.log(hash);
    var element_to_scroll_to = document.getElementById(hash);
    element_to_scroll_to.scrollIntoView();
}

function createWidgetPopup(widgetHtml, widgetId) {
    if (widgetStatus.status == 'hidden') {
        //$('body').append('<div id="widget-overlay" class="popup-overlay modal-overlay-visible"></div>');

        var originLeft = $('#' + widgetId).position().left + 30;
        var originTop = $('#' + widgetId).position().top + 30;
        //alert(originLeft+' '+originTop);
        var endLeft = '48%';
        var endTop = 0 + 60;

        $('#widget-popup-container').css({
            'left': originLeft,
            'top': originTop,
            'opacity': '0',
            'display': 'inline-block',
            'width': '0',
            'height': '0'
        });
        $('#widget-popup-container-content').html(widgetHtml);

        $('#widget-popup-container').animate({
            opacity: 1,
            left: endLeft,
            top: endTop,
            width: '45%',
            height: '50%',
        }, 750);
        widgetStatus = {
            status: 'shown',
            returnLeft: originLeft,
            returnTop: originTop
        };

        $('#widget-close-link').unbind();
        $('#widget-close-link').click(function() {
            returnWidgetPopup('widget-popup-container', originLeft, originTop);
        });
        /*$('body').click(function(){
      returnWidgetPopup('widget-popup-container', originLeft, originTop);
    });*/
    } else {
        returnWidgetPopup('widget-popup-container', widgetStatus.returnLeft, widgetStatus.returnTop);
    }
}

function returnWidgetPopup(popupId, endLeft, endTop) {
    $('#widget-popup-container').animate({
        opacity: 0,
        left: endLeft,
        top: endTop,
        width: 0,
        height: 0,
    });
    widgetStatus.status = 'hidden';
    //$('#widget-overlay').remove();
}

function fadeInFirstComment() {
    $('.timeline').children().first().css('opacity', '0');
    $('.timeline').children().first().animate({
        opacity: 1
    }, 1000);
}