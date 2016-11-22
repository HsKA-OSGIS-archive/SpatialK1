var stadiumFoetus = ""
var ageGroup = ""
var jsonpath = ""

var JSONvariable = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
         "begin": "02.06.2015 11:30",
         "end": "02.06.2015 15:00",
         "residence": "outside",
         "actions": [ "iodine", "evacuation" ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
             8.6015,
            49.5271
          ],
          [
             8.8125,
            49.9521
          ],
          [
             8.8125,
            49.5530
          ],
          [
             8.8312,
            49.4469
          ]
        ]
      }
    }
  ]
}


function createXML(){    
   var v = new  XMLWriter();
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
				v.writeCDATA(jsonpath);
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
 //  v.writeEndDocument();
   
   
   //Pregnant
 //  v.writeStartDocument(true);
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
   console.log( v.flush() );

}
