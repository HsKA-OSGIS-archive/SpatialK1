function log(input){
	console.log(input);
}

var elem;
var actions;

var map = new OpenLayers.Map('map', {
                layers: [
                    new OpenLayers.Layer.OSM('OSM'),
                    new OpenLayers.Layer.OSM('OpenCycleMap',
                    ['http://a.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png',
                    'http://b.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png',
                    'http://c.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png'])
                    ],
                controls: [
                    new OpenLayers.Control.Navigation(),
                    new OpenLayers.Control.Attribution(),

                    //new OpenLayers.Control.PanZoomBar(),

                   //new OpenLayers.Control.PanZoomBar(),

                    new OpenLayers.Control.LayerSwitcher({
                        'ascending': true
                    }),
                    new OpenLayers.Control.ScaleLine(),
                    new OpenLayers.Control.MousePosition(),
                    new OpenLayers.Control.SelectFeature(),
                    new OpenLayers.Control.KeyboardDefaults()
                ],
                projection: new OpenLayers.Projection("EPSG:4326"),
                center: new OpenLayers.LonLat(8.4028, 49.011 ).transform('EPSG:4326', 'EPSG:3857'),
                zoom: 13

           
            });
     
			map.addControl(new OpenLayers.Control.MousePosition());

	 
			function flashFeatures(features, index) {
				if(!index) {
					index = 0;
				}
				var current = editingLayer.features[index];
				if(current && current.layer === editingLayer) {
					editingLayer.drawFeature(features[index], "select");
				}
				var prev = editingLayer.features[index-1];
				if(prev && prev.layer === editingLayer) {
					editingLayer.drawFeature(prev, "default");
				}
				++index;
				if(index <= editingLayer.features.length) {
					window.setTimeout(function() {flashFeatures(editingLayer.features, index)}, 100);
				}
            }


        // we will use this vector layer to demonstrate editing vector features
         var styleMap = new OpenLayers.StyleMap({
				
		
		"default": 	new OpenLayers.Style({
						 strokeWidth: 4,
						 //strokeColor: '#1c74cc',
						 strokeOpacity:1,
						 pointRadius:5,
						strokeColor: '#039',
						strokeOpacity: 1,
						fillColor: "#3366ff",
						graphicZIndex: 1
					}),
					
					   "select": new OpenLayers.Style({
						strokeWidth: 5,
						strokeColor: '#d81b23',
						strokeOpacity: 1,
						
					}),
						
		});
		
		var editingLayer = new OpenLayers.Layer.Vector("Editing", {styleMap: styleMap});
		 editingLayer.events.register('featureadded', editingLayer, function(evt) {
			setVariables();
		 });
		var pointLayer = new  OpenLayers.Layer.Vector("Point", {styleMap: styleMap});
		 pointLayer.events.register('featureadded', pointLayer, function(evt) {
			toLine();
		 });

		
		map.addLayers([editingLayer]);
		map.addLayers([pointLayer]);
		
		function setVariables(){	
			editingLayer.refresh();
			actions= [];
			var loopAactions  = ["residence","iodine", "evacuation", "protecting_mask"];
			arrLength = editingLayer.features.length;
			editingLayer.features[arrLength-1].attributes["begin"]=begin;
			editingLayer.features[arrLength-1].attributes["end"]=fertig;
			
			for (var i = 0; i< loopAactions.length; i++){
				elem = document.getElementById(loopAactions[i]);
				
				if (elem.id=="residence"){
					editingLayer.features[arrLength-1].attributes[elem.id]=elem.value;
				}
				else if(elem.checked  == true){
					log("ACTION");
					console.log(actions);
					actions.push(elem.id);
					editingLayer.features[arrLength-1].attributes["actions"]=actions;
				}
			}
			
		}
		
		function toLine(){
			
			var x, y;
			var points=[];
			var ind = pointLayer.features.length-1;
			for (var i = 0; i<pointLayer.features.length; i++){
				var points = pointLayer.features[ind].geometry;
			}
			var pline = new OpenLayers.Geometry.LineString(points);
			var fL= new OpenLayers.Feature.Vector(pline);
		
			editingLayer.addFeatures(fL);
			points= [0];	
		}
        
        
		var split = new OpenLayers.Control.Split({
			layer: editingLayer,
			eventListeners: {
				aftersplit: function(event) {
					flashFeatures(event.features);
				}
			}
		});
		  

// Snapping
// two Snapping variables are necessary because there are two layers with geometries
		  
	var snap = new OpenLayers.Control.Snapping({
				defaults:{
					tolerance: 40,
					edge: false,
					node: true,
					vertex: false
				},
                layer: editingLayer,
                targets: [editingLayer, pointLayer],
                greedy: false
            });
            snap.activate();
			
	

	var snap2 = new OpenLayers.Control.Snapping({
				defaults:{
					tolerance: 40,
					edge: false,
					node: true,
					vertex: false
				},
                layer: pointLayer,
                targets: [editingLayer, pointLayer],
                greedy: false
            });
            snap2.activate();
	
			
  // init the editing toolbar and a basic selection control
         var drawControls ={
			point: new OpenLayers.Control.DrawFeature(pointLayer,
                        OpenLayers.Handler.Point),
			draw: new OpenLayers.Control.DrawFeature(editingLayer,
						OpenLayers.Handler.Path),			
			drag: new OpenLayers.Control.DragFeature(editingLayer),
			select: new OpenLayers.Control.SelectFeature(
					editingLayer,
					{
						layers:[pointLayer, editingLayer],
						onSelect: returnSelected,
						clickout: true, toggle: false,
						multiple: false, hover: false,
						toggleKey: "ctrlKey", // ctrl key removes from selection
						multipleKey: "shiftKey", // shift key adds to selection
						box: true,
						click: true
					}),
				
					
								
					
			split: split
		};		
		
		function returnSelected(feature){
			showSelected(feature)
			return feature;
		}

		function showSelected(feature){
			var iodineSel, evacuationSel, protecting_maskSel, residenceSel;
			if(feature.attributes.actions){
				iodineSel = feature.attributes.actions.includes("iodine");
				evacuationSel = feature.attributes.actions.includes("evacuation");
				protecting_maskSel = feature.attributes.actions.includes("protecting_mask");
			}else{
				iodineSel = false;
				evacuationSel = false;
				protecting_maskSel = false;
			}
			residenceSel = feature.attributes.residence;
			$("#protecting_mask").checked = protecting_maskSel;
			$("#iodine").checked = iodineSel;
			$("#residence").val(residenceSel);
			$("#evacuation").checked = evacuationSel;
			
			$("#wPSContainer").show('fade', 300);
		}

		function saveChanges(feature){
			var actions = {};
			if($("#protecting_mask").checked = true){
				actions.push("protecting_mask")
			}
			if($("#iodine").checked = true){
				actions.push("iodine")
			}
			if($("#evacuation").checked = true){
				actions.push("evacuation")
			}
			feature.attributes.actions = actions;
		}

		function resetSelected(feature){
			$("#protecting_mask").checked = false;
			$("#iodine").checked = false;
			$("#residence").val("outside");
			$("#evacuation").checked = false;
			
			$("#wPContainer").show('fade', 300);
		}
		
		for(var key in drawControls) {
					map.addControl(drawControls[key]);
		}
		var residenceVal;
		function checkStay (element){
			if (element=="point"){
				document.getElementById("outside").style.display = "none";
				document.getElementById("residence").value = "house";
				residenceVal="house";				
			}
			toggleControl(element);
		}
		
		//---------------------Zeichenfunktion-----------------------------------
		  function toggleControl(element) {
				
				for(key in drawControls) {
					var control = drawControls[key];
					if(element == key && element) {
						log("EditingLAYER");
						log(editingLayer);
						control.activate();
					} else {
						control.deactivate();
					}
				}
			}


//--------------- Geocoding Funktion mit Nominatim---------------------
var inp;
var items = [];
var inp_val;
var dtlat;
var dtlon;
var result;
function addr_search(id){
	//id = "#" + id;
	var resultContainer = '#results' + id.replace('#', '');
		//Zugriff auf EingabeObjekt
	inp = id;
	//Eingabe-Objekt wird als Wert gespeichert
	var inp_val = document.getElementById(inp).value;// ;  $(id).value;
	console.log("inp: " + inp + " inp_val: " + inp_val);
	//Sonderzeichen werden ersetzt
	inp_val = inp_val.replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/Ä/g,"Ae").replace(/Ö/g,"Oe").replace(/Ü/g,"Ue").replace(/ß/g,"ss");
	
	//Zugriff auf Nominatim
	$.ajax({url: ' http://nominatim.openstreetmap.org/search?q=135+pilkington+avenue,+birmingham&format=xml&polygon=1&addressdetails=1',
	        type: "HEAD",
	        timeout:1000,
	        statusCode: { //status code
	            200:
	            	$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp_val, function(data) {
					result=data;
					console.log("result:"+ data);
					items.length = 0;	 
						 $.each(data, function(key, val) {
						    items.push(
						     "<li id='list'><a href='#' onclick='chooseAddr(" +
						     val.lat + ", " + val.lon + "," + val.place_id +");'>" + val.display_name +
						     '</a></li>'
						  );
						});
					
						//var first_item = chooseAddr(val.lat, val.lon);
						    $(resultContainer).empty();
					     if (items.length != 0) {
					      $('<ul/>', {
					         'class': 'my-new-list',
							 'onclick' : '$('+ resultContainer + ').empty()',
					         html: items.join('')
					       }).appendTo(resultContainer);

					     } else {
					       $('<p>', { html: "Keine Vorschläge gefunden" }).appendTo(resultContainer);
					     }
					  }),
	            400: function (response) {
	                alert('Bad Request');
	            },
	            0: function (response) {
	                alert('Not working!');
	            },
	            404: function (response){
	            	alert('Server not found');
	            },
	            444: function (response){
	            	alert('No Response');
	            },
	            500: function(response){
	            	alert('Server down! Please try again later...');
	            }  

	        } //status code
	 });
}
//------------------ENDE Geocoding mit Nominatim-------------------------

//------------------ Setter methods for start and destination coordinate variables---

var lat_start, lon_start, lat_stop, lon_stop;

function setStart(startlat, startlon){
	lat_start = startlat;
	lon_start = startlon;
}

function setStop(stoplat, stoplon){
	lat_stop = stoplat;
	lon_stop = stoplon;
}

//------------------Routin Funktion mit OSRM--------------------------------------
var url = "http://router.project-osrm.org/viaroute?loc=";

var properties;
properties = 'cycling';

function routing(){
	
	var vectorLayer;
	var pArray = [];

	pointArray =[];
	var route_line;
	
$.ajax({url: 'http://router.project-osrm.org/route/v1/cycling/8.4044366,49.0140679;8.694,49.4093582?alternatives=true&steps=false&geometries=geojson&overview=full',
	        type: "HEAD",
	        timeout:1000,
	        statusCode: { //status code
	            200:  $.getJSON('http://router.project-osrm.org/route/v1/' + properties + '/'+lon_start+','+lat_start+';'+ lon_stop +','
	+ lat_stop + '?alternatives=true&steps=false&geometries=geojson&overview=full', function (data) {
        var test = data.routes[0].geometry.coordinates;
         epsg4326 =  new OpenLayers.Projection("EPSG:4326");
        projectTo = map.getProjectionObject();
		
		pArray.length = 0;
		pointArray.length = 0;

		
      for (i = 0; i< test.length; i++){
        	pointArray.push(new OpenLayers.Geometry.Point( test[i][0], test[i][1]).transform("EPSG:3857", epsg4326));
        	
        }
		route_line = new OpenLayers.Geometry.LineString(pointArray).transform("EPSG:3857", epsg4326);


		var routeStyle = new OpenLayers.StyleMap({
	
				
				"default": 	new OpenLayers.Style({
		
			    strokeColor: "#ff9933",
				strokeOpacity: 1,
				fillColor: "#ff9933",
				graphicZIndex: 1

            })
		});
		
		
		
    	var vectorSource= new OpenLayers.Feature.Vector( pointArray);
		vectorLayer = new OpenLayers.Layer.Vector("Vector");
		vectorLayer.addFeatures([vectorSource]);
		
		var feature = new OpenLayers.Feature.Vector(route_line, routeStyle);
		
		
    	var vectorLayer = new OpenLayers.Layer.Vector();
    	
    	vectorLayer.addFeatures([feature]);
		var clone = vectorLayer.clone();
		editingLayer.addFeatures(clone.features);
		
		vectorLayer.destroyFeatures();
		vectorSource.destroy();
		route_line.length = 0;
		
    }), 
	              400: function (response) {
	                alert('Bad Request');
	            },
	            0: function (response) {
	                alert('Not working! Routing');
	            },
	            404: function (response){
	            	alert('Server not found');
	            },
	            444: function (response){
	            	alert('No Response');
	            },
	              500: function (response){
	            	alert('Server Down! Try again later.........');
	            },   
	             504: function (response){
	            	alert('Server Down! Try again later.1........');
	            }           
	        }

});
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------------------------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//------------------Fokus auf eingegebene Adresse-------------------------
	function chooseAddr(lat, lng, name) {
	
	//--------------write result to start input field---------------------
	for(placeid in result){
		if (result[placeid].place_id==name){
			log("placeid:"+result[placeid].place_id);			
			
		
		if(inp=='start'){
			document.getElementById("start").value=result[placeid].display_name;;
			setStart(lat, lng);
		}else{
			document.getElementById("stop").value=result[placeid].display_name;;
			setStop(lat, lng);
	  }
	}
	}

	 
	  var location = new OpenLayers.LonLat(lng,lat);
	  map.setCenter(location.transform('EPSG:4326', 'EPSG:3857'));
	  map.zoomTo(17);	 
	 $('.my-new-list').empty(); //remove list when item chosen
	 
	  
//------------------add Marker to map -------------------------------------
	  var markers = new OpenLayers.Layer.Markers( "Markers");
	  map.addLayer(markers);



	  var size = new OpenLayers.Size(42,50);
	  var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
	  var offset_2 = new OpenLayers.Pixel(-(size.w/5), -size.h);
	  if(inp=='start'){
	  	log("MARKERS");
	  	log(markers);

		var icon = new OpenLayers.Icon('./images/Start_icon.svg', size, offset);

	  }else{
	  	log("MARKERS2")
	  	log(markers);
		var icon = new OpenLayers.Icon('./images/Ziel_icon.svg', size, offset_2);
		
	  }
	  
	  markers.addMarker(new OpenLayers.Marker(location,icon));
	  
		  
	  
	  
	}








//-------------------Ende Fokus auf eingegebene Adresse

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------------------------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


