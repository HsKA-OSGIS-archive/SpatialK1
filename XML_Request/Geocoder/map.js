function addr_search(){
	var inp = document.getElementById("addr");
	$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {
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
	function chooseAddr(lat, lng, type) {
	  var location = new OpenLayers.LonLat(lng,lat);
	  map.setCenter(location.transform('EPSG:4326', 'EPSG:3857'));
	  map.zoomTo(17);
	}
	//   if (type == 'city' || type == 'administrative') {
	//     map.getZoom(11);
	//   } else {
	//     map.getZoom(13);
	//   }
	// }
