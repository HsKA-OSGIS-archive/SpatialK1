

var v;


function inJson(){
	var geoJSON = new OpenLayers.Format.GeoJSON();
	json_var = geoJSON.write( editingLayer.features );
	console.log('json: ' +json_var);
}

function createXML(){  
  
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
   v.writeStartElement("Identiefier", "ows"); 
   v.writeString("gs:DoseReconstruction");
   v.writeEndElement();
   v.writeStartElement("DataInputs", "wps");
  
   //JSON

	   v.writeStartElement("Input", "wps"); 
		   v.writeStartElement("Identiefier", "ows"); 
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
		   v.writeStartElement("Identiefier", "ows"); 
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
		   v.writeStartElement("Identiefier", "ows"); 
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

}

