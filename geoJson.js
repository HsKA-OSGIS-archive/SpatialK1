//save features of layer in Json format
function inJson(){
	var geoJSON = new OpenLayers.Format.GeoJSON();
	var json = geoJSON.write( editingLayer.features );
	console.log('json: ' +json);
}

