

var v;
var rbm;
var foetus;
var thyroid;
var dose;
var vx;


var response = {
"red_bone_marrow": 0.021267209339325046,
"foetus_1": 1.4563841265250478E-5,
"thyroid": 0.024101517905976158,
"eff_dose": 0.024116610070867805
};


function inJson(){
	var geoJSON = new OpenLayers.Format.GeoJSON();
	json_var = geoJSON.write( editingLayer.features );
	console.log('json: ' +json_var);
}

function readResponse(){
	
	rbm = response.red_bone_marrow.toFixed(10);
	foetus = response.foetus_1.toFixed(10);
	thyroid = response.thyroid.toFixed(10);
	dose = response.eff_dose.toFixed(10);
	
}

function createXML(){  
  
  
  
  vx = '<?xml version="1.0" encoding="UTF-8" standalone="true" ?>' +
'<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">' +
	'<ows:Identifier>gs:DoseReconstruction</ows:identifier>'+
	'<wps:DataInputs>'+
		'<wps:Input>'+
			'<ows:Identifier>route</ows:identifier>'+
			'<wps:Data>'+
				'<wps:ComplexData mimeType="application/json"><![CDATA['+ json_var +']]></wps:ComplexData>'+
			'</wps:Data>'+
		'</wps:Input>'+
		'<wps:Input>'+
			'<ows:Identifier>ageGroup</ows:identifier>'+
			'<wps:Data>'+
				'<wps:LiteralData>'+ ageGroup +
				'</wps:LiteralData>'+
			'</wps:Data>'+
		'</wps:Input>'+
		'<wps:Input>'+
			'<ows:Identifier>stadiumFoetus</ows:identifier>'+
			'<wps:Data>'+
				'<wps:LiteralData>'+ stadiumFoetus +
				'</wps:LiteralData>'+
			'</wps:Data>'+
		'</wps:Input>'+
	'</wps:DataInputs>'+
'</wps:Execute>'
  
  
  
  
 // vx= '<?xml version="1.0" encoding="UTF-8" standalone="true" ?><ows:identifier>gs:DoseReconstruction</ows:identifier><wps:DataInputs><wps:Input>'
  console.log("XML as String " +vx);
  
  parser = new DOMParser();
	vx = parser.parseFromString(vx, "text/xml");
	
	console.log("XML as oject " + vx);
  
  
  //Old XML creation with XML Writer library
  
/*
  
  
   v = new XMLWriter();
   v.writeStartDocument(true);  
   v.writeStartElement("Execute", "wps")
		v.writeAttributeString('version','1.0.0');
		v.writeAttributeString('service','WPS');
		v.writeAttributeString('xmlns:xsi','http://www.w3.org/2001/XMLSchema-instance');
		v.writeAttributeString('xmlns','http://www.opengis.net/wps/1.0.0');
		v.writeAttributeString('xmlns:wfs','http://www.opengis.net/wfs');
		v.writeAttributeString('xmlns:wps','http://www.opengis.net/wps/1.0.0');
		v.writeAttributeString('xmlns:ows','http://www.opengis.net/ows/1.1');
		v.writeAttributeString('xmlns:gml','http://www.opengis.net/gml');
		v.writeAttributeString('xmlns:ogc','http://www.opengis.net/ogc');
		v.writeAttributeString('xmlns:wcs','http://www.opengis.net/wcs/1.1.1');
		v.writeAttributeString('xmlns:xlink','http://www.w3.org/1999/xlink');
		v.writeAttributeString('xsi:schemaLocation','http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd');		
   v.writeStartElement("identifier", "ows"); 
   v.writeString("gs:DoseReconstruction");
   v.writeEndElement();
   v.writeStartElement("DataInputs", "wps");
  
   //JSON

	   v.writeStartElement("Input", "wps"); 
		   v.writeStartElement("identifier", "ows"); 
		   v.writeString("route");
		   v.writeEndElement();
		   v.writeStartElement("Data", "wps");   
				v.writeStartElement("ComplexData", "wps");
				v.writeAttributeString('mimeType','application/json');				
				v.writeCDATA(json_var);
		   v.writeEndElement();
		   v.writeEndElement();
	   v.writeEndElement();


  
   
   //AgeGroup

	   v.writeStartElement("Input", "wps"); 
		   v.writeStartElement("identifier", "ows"); 
		   v.writeString("ageGroup");
		   v.writeEndElement();
		   v.writeStartElement("Data", "wps");   
				v.writeStartElement("LiteralData", "wps"); 
				v.writeString(ageGroup);
		   v.writeEndElement();
		   v.writeEndElement();
	   v.writeEndElement();
 
   
   
   //Pregnant

	   v.writeStartElement("Input", "wps"); 
		   v.writeStartElement("identifier", "ows"); 
		   v.writeString("stadiumFoetus");
		   v.writeEndElement();
		   v.writeStartElement("Data", "wps");   
				v.writeStartElement("LiteralData", "wps"); 
				v.writeString(stadiumFoetus);
		   v.writeEndElement();
		   v.writeEndElement();
	   v.writeEndElement();
	v.writeEndElement();
   v.writeEndDocument();
   v.writeEndDocument();
   console.log('' + v);
   console.log( v.flush() );
*/
}

