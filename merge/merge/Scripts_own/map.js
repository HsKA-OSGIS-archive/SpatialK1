var map = new OpenLayers.Map('map', {
                layers: [
                    new OpenLayers.Layer.OSM('OSM'),
                    new OpenLayers.Layer.OSM('OpenCycleMap',
                    ['http://a.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png',
                    'http://b.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png',
                    'http://c.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png'])
                    ],
                controls: [
                    new OpenLayers.Control.Attribution(),
                    new OpenLayers.Control.LayerSwitcher({
                        'ascending': true
                    }),
                    new OpenLayers.Control.ScaleLine(),
                    new OpenLayers.Control.MousePosition(),
                    
                    new OpenLayers.Control.KeyboardDefaults(),
                   
                ],
                center: new OpenLayers.LonLat(8.39, 48.999).transform('EPSG:4326', 'EPSG:3857'),
                zoom: 13

           
            });
     



        // we will use this vector layer to demonstrate editing vector features
        var editingLayer = new OpenLayers.Layer.Vector("Editing");
        map.addLayers([editingLayer]);
        //var snapVertex = {methods: ['vertex', 'edge'], layers: [vectors]};

        







        // init the editing toolbar and a basic selection control
        var editingToolbar = new OpenLayers.Control.EditingToolbar(editingLayer);
        var selectCtrl = new OpenLayers.Control.SelectFeature(
                editingLayer, {
                //hover: true
                eventListeners:{
                    featurehighlighted: function overlay_delete(event){
                        var feature = event.feature;

                        //if(confirm(strConfirmMessage)){
                            editingLayer.removeFeatures([feature]);
                        //}
                    }
                }
            });
        map.addControls([editingToolbar, selectCtrl]);
        selectCtrl.activate();



//--------------- Geocoding Funktion mit Nominatim---------------------
function addr_search(id){
	//id = "#" + id;
	var resultContainer = '#results' + id.replace('#', '');
		//Zugriff auf EingabeObjekt
	var inp = $(id);
	//Eingabe-Objekt wird als Wert gespeichert
	var inp_val = document.getElementById('id').text// ;  $(id).value;
	alert(inp_val);
	//Sonderzeichen werden ersetzt
	inp_val = inp_val.replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/Ä/g,"Ae").replace(/Ö/g,"Oe").replace(/Ü/g,"Ue").replace(/ß/g,"ss");
	alert('Nach replae: ' + inp_val);

	//Zugriff auf Nominatim
	$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp_val, function(data) {
		 var items = [];
		 $.each(data, function(key, val) {
		   items.push(
		     "<li><a href='#' onclick='chooseAddr(" +
		     val.lat + ", " + val.lon + ");return false;'>" + val.display_name +
		     '</a></li>'

			//console.log("key:"+key);
		  );
		});
	
		//var first_item = chooseAddr(val.lat, val.lon);

		    $(resultContainer).empty();
	     if (items.length != 0) {
	    	alert('more than 0 results');
	      $('<ul/>', {
	         'class': 'my-new-list',
			 'onclick' : '$('+ resultContainer + ').empty()',
	         html: items.join('')
	       }).appendTo(resultContainer);
	     } else {
	       $('<p>', { html: "Keine Vorschläge gefunden" }).appendTo(resultContainer);
	     }
	  });
}
//------------------ENDE Geocoding mit Nominatim-------------------------

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------------------------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//------------------Fokus auf eingegebene Adresse-------------------------
	function chooseAddr(lat, lng) {
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