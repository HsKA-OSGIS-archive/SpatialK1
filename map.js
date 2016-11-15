
//--------------- Geocoding Funktion mit Nominatim---------------------
function addr_search(){
	//Zugrif auf EingabeObjekt
	var inp = document.getElementById("addr");
	//Eingabe-Objekt wird als Wert gespeichert
	var inp_val = inp.value
	//Sonderzeichen werden ersetzt
	inp_val = inp_val.replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/Ä/g,"Ae").replace(/Ö/g,"Oe").replace(/Ü/g,"Ue").replace(/ß/g,"ss");
	console.log("inp" + inp_val);

	//Zugriff auf Nominatim
	$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp_val, function(data) {
		var items = [];
		$.each(data, function(key, val) {
		  items.push(
		    "<li><a href='#' onclick='chooseAddr(" +
		    val.lat + ", " + val.lon + ");return false;'>" + val.display_name +
		    '</a></li>'
		  );
		});

		   $('#results').empty();
	    if (items.length != 0) {
	      $('<p>', { html: "Search results:" }).appendTo('#results');
	      $('<ul/>', {
	        'class': 'my-new-list',
	        html: items.join('')
	      }).appendTo('#results');
	    } else {
	      $('<p>', { html: "No results found" }).appendTo('#results');
	    }
	  });
}
//------------------ENDE Geocoding mit Nominatim-------------------------

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------------------------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//------------------Fokus auf eingegebene Adresse-------------------------
	function chooseAddr(lat, lng, type) {
	  var location = new OpenLayers.LonLat(lng,lat);
	  map.setCenter(location.transform('EPSG:4326', 'EPSG:3857'));
	  map.zoomTo(17);
	}
//-------------------Ende Fokus auf eingegebene Adresse

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------------------------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//---------------------Zeichenfunktion-----------------------------------
		 function toggleControl(element) {
				
				for(key in drawControls) {
					console.log("hi");
					var control = drawControls[key];
					
					if(element.value == key && element.value) {
						control.activate();
						
					} else {
						control.deactivate();
						
					}
				}
			}
//---------------------Ende der Zeichenfunktion--------------------------
//---------------------Form--------------------------------------------------
var begin, end, residence, ageGroup, stadiumFoetus, result;
var actions = [];
//---------------------Ende der Form--------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------------------------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++