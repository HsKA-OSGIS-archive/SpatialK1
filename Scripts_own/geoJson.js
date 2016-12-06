//save features of layer in Json format
function inJson(){
	var geoJSON = new OpenLayers.Format.GeoJSON();
	json_var = geoJSON.write( editingLayer.features );
	console.log('json: ' +json_var);
}

