


var rbm;
var foetus;
var thyroid;
var dose;
var vx;

// variable containing the response from the Server

var response = {
"red_bone_marrow": 0.021267209339325046,
"foetus_1": 1.4563841265250478E-5,
"thyroid": 0.024101517905976158,
"eff_dose": 0.024116610070867805
};

// reads the JSON from the layer in the map
function inJson(){
	var geoJSON = new OpenLayers.Format.GeoJSON();
	json_var = geoJSON.write( editingLayer.features );
	console.log('json: ' +json_var);
}



//converts the response JSON in values for the GUI
//converts the unit in mSv 

function readResponse(){
	console.log("readresponse");
	rbm = ((response.red_bone_marrow)*1000).toFixed(2);
	rbm = rbm + " mSv";
	foetus = ((response.foetus_1)*1000).toFixed(4);
	foetus = foetus +  " mSv";
	thyroid = ((response.thyroid)*1000).toFixed(2);
	thyroid = thyroid + " mSv";
	dose = ((response.eff_dose)*1000).toFixed(2);
	dose = dose +" mSv";
	
}


// creates the xml as String
function createXML(){  
  
  
  
  vx = '<?xml version="1.0" encoding="UTF-8" standalone="true" ?>' +
'<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">' +
	'<ows:Identifier>gs:DoseReconstruction</ows:identifier>'+
	'<wps:DataInputs>'+
		'<wps:Input>'+
			'<ows:Identifier>route</ows:identifier>'+
			'<wps:Data>'+
				'<wps:ComplexData mimeType="application/json"><![CDATA['+ json_var +']]></wps:ComplexData>'+ //the JSON is included in the XML
			'</wps:Data>'+
		'</wps:Input>'+
		'<wps:Input>'+
			'<ows:Identifier>ageGroup</ows:identifier>'+
			'<wps:Data>'+
				'<wps:LiteralData>'+ ageGroup + //the age variable is included in the XML
				'</wps:LiteralData>'+
			'</wps:Data>'+
		'</wps:Input>'+
		'<wps:Input>'+
			'<ows:Identifier>stadiumFoetus</ows:identifier>'+
			'<wps:Data>'+
				'<wps:LiteralData>'+ stadiumFoetus + //the pregnancy variable is included in the XML
				'</wps:LiteralData>'+
			'</wps:Data>'+
		'</wps:Input>'+
	'</wps:DataInputs>'+
'</wps:Execute>'
  
  
  
  

  console.log("XML as String " +vx);
  
  
  // creates a XML-Object from the String
  parser = new DOMParser();
	xml_var = parser.parseFromString(vx, "text/xml");
	
	//console.log("XML as object " + xml_var);
  
}

