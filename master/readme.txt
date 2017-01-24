Welcome to the SpatialK radiation dose calculator!!
We're glad to present you the final version of our project.

To successfully use the grphical user interface (GUI) please download or clown the following repository in github:
https://github.com/HsKA-OSGIS/SpatialK1.git

After having saved the files in a suitable repository, please execute the file "index.html".
A webpage will open with a OpenStreetMap-basemap and a container with the functions to be used.
This website is dedicated to people who want to calculate the rate of radiation they were exposed to between a certain 
period of time.

The GUI shows two containers after loading the page: a information container with useful explanations about the 
site and a container where the user can input his/her details. Age can be entered as well as a possible pregnancy.
These settings are supposed to stay constant during one session. Afterwards, a route can be entered with start 
and stop addresses. Time can also be adjusted. 
Additionally to the routing, features such as lines and points can be manually entered for which a radiation dosis will
be calculated. 
For testing purposes the following restrictions are to be followed:

xmin;xmax;ymin;ymax;timestamp
6.68686;15.02531;47.49356;51.68884;"2015-06-02 12:00:00"
6.6879;15.02531;47.55625;51.68884;"2015-06-02 13:00:00"
6.68686;15.02531;47.49356;51.68884;"2015-06-02 14:00:00"
6.68686;15.02531;47.49356;51.68884;"2015-06-02 15:00:00"
6.6879;15.02531;47.55625;51.68884;"2015-06-02 16:00:00"
6.68686;15.02531;47.49356;51.68884;"2015-06-02 17:00:00"

Further editing of the drawn features can be done. After a feature was created, it can be also selected, dragged,
split and deleted using the given buttons.
A info-window opens when a new feature is to be created with additional information a user can optionally enter.
This information contains data about iodine-tablettes, gas mask and if an evacuation took place. Once this data was entered,
and "Bestätigen" was clicked, the information is added to the result. If the user selects a feature, this window opens again
and the data can be adjusted. 
On click on the "Dosis Berechnen" button, a geojson is created and sent to a server where the final dosis is 
calculated. A result-container will open, displaying the final radiation dosis measured in mSv.


A configurable URL can be found in "url_config.js".

Please enjoy the website.
SpatialK!

Copyright (c) 2016, SpatialK
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those
of the authors and should not be interpreted as representing official policies,
either expressed or implied, of the FreeBSD Project.