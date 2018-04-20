function initMap() {
        //var uluru = {lat: 20.4859524, lng: -100.9557273};
				var destino = {lat: 20.483039, lng: -100.963498};
				var destinoTmp= getDestiny();
				//alert (destinoTmp.lat);
				destino.lat=parseFloat(destinoTmp.lat);
				destino.lng=parseFloat(destinoTmp.lng);
        window.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: destino,
		  		mapTypeId: google.maps.MapTypeId.HYBRID
        });

        // var marker = new google.maps.Marker({
          // position: uluru,
          // map: map,
          // animation: google.maps.Animation.BOUNCE
        // });

				var destBound = new google.maps.Marker({
          position: destino,
          map: map
        });


				// Instanciar servicios de direccion.
				directionsService = new google.maps.DirectionsService,
				directionsDisplay = new google.maps.DirectionsRenderer({
				map: map,
				suppressMarkers: true
				});

				// Try HTML5 geolocation.
				var infoWindow = new google.maps.InfoWindow({map: map});

								if (navigator.geolocation) {
									navigator.geolocation.getCurrentPosition(function(position) {
										var pos = {
											lat: position.coords.latitude,
											lng: position.coords.longitude
										};

										var marker = new google.maps.Marker({
											position: pos,
											map: map,
											//animation: google.maps.Animation.BOUNCE
										});

										map.setCenter(pos);
										calculateAndDisplayRoute(directionsService, directionsDisplay, pos, destino);
									}, function() {
										handleLocationError(true, infoWindow, map.getCenter());
									});
								} else {
									// Browser doesn't support Geolocation
									handleLocationError(false, infoWindow, map.getCenter());
								}

      }


function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
      directionsService.route({
        origin: pointA,
        destination: pointB,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	       infoWindow.setPosition(pos);
	       infoWindow.setContent(browserHasGeolocation ?
	                             'Error: El servicio de geolocalizacion fallo.' :
	                             'Error: Tu navegador no puede encontrarte.');
	     }

function getDestiny(){

	if (window.XMLHttpRequest)
	{
	// Objeto para IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
	}else{
	// Objeto para IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	// Abrimos el archivo que esta alojado en el servidor cd_catalog.xml
	xmlhttp.open("GET","dist/data/destino.xml",false);
	xmlhttp.send();

	// Obtenemos un objeto XMLDocument con el contenido del archivo xml del servidor
	xmlDoc=xmlhttp.responseXML;

	// Obtenemos todos los nodos denominados foro del archivo xml
	var destXML=xmlDoc.getElementsByTagName("destino");

	// Hacemos un bucle por todos los elementos foro
	for(var i=0;i<destXML.length;i++)
	{
		latitud=destXML[i].getElementsByTagName("lat")[0].childNodes[0].nodeValue
		longitud=destXML[i].getElementsByTagName("lng")[0].childNodes[0].nodeValue
	}

	var destinoXML = {lat: latitud, lng: longitud};
	//alert(destinoXML.lat);
	return destinoXML;

}
