// Template by http://github.com/jackdougherty/leaflet-map/
// See Leaflet tutorial links in README.md

// set up the map center and zoom level
var map = L.map('map', {
  center: [41.6, -72.65], // [41.5, -72.7] for Connecticut; [41.76, -72.67] for Hartford county or city
  zoom: 9, // zoom 9 for Connecticut; 10 for Hartford county, 12 for Hartford city
  zoomControl: false // add later to reposition
});

// optional : customize link to view source code; add your own GitHub repository
map.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/otl-metro-definitions">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

// optional: add legend to toggle any baselayers and/or overlays
// global variable with (null, null) allows indiv layers to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: "bottomright", // suggested: bottomright for CT (in Long Island Sound); topleft for Hartford region
  collapsed: false // false = open by default
}).addTo(map);

// optional: reposition zoom control other than default topleft
L.control.zoom({position: "topright"}).addTo(map);

/* BASELAYERS */
// use common baselayers below, delete, or add more with plain JavaScript from http://leaflet-extras.github.io/leaflet-providers/preview/
// .addTo(map); -- suffix displays baselayer by default
// controlLayers.addBaseLayer (variableName, 'label'); -- adds baselayer and label to legend; omit if only one baselayer with no toggle desired
var lightAll = new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map); //this displays layer by default
// controlLayers.addBaseLayer(lightAll, 'CartoDB LightAll');

/* POINT OVERLAYS */
// ways to load point map data from different sources: coordinates in the code, GeoJSON in local directory, remote GeoJSON and JSON

// load one point from coordinates in code, icon from local directory, no interactive legend button
// places a star on state capital of Hartford, CT
// * TO DO: test whether placement of this code affects its display order, on top of other icons?
var starIcon = L.icon({
  iconUrl: 'src/star-18.png',
  iconRetinaUrl: 'src/star-18@2x.png',
  iconSize: [18, 18]
});
L.marker([41.764, -72.682], {icon: starIcon}).addTo(map);

/* POLYGON OVERLAYS */

// load polygon data with clickable features from local directory
$.getJSON("src/CTtowns.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'black',
        'weight': 1,
        'fillColor': '#fff',
        'fillOpacity': 0.2
      }
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.Town) // change 'Town' to match your geojson property labels
    }
  }).addTo(map);  // insert ".addTo(map)" to display layer by default
  // controlLayers.addOverlay(geoJsonLayer, 'CT Towns');  // insert your 'Title' to add to legend
});

$.getJSON("src/1950-SMA.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'red',
        'weight': 4
      }
    }
  }).addTo(map);  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(geoJsonLayer, '1950 SMA');  // insert your 'Title' to add to legend
});

$.getJSON("src/1960-SMSA.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'blue',
        'weight': 4
      }
    }
  });  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(geoJsonLayer, '1960 SMSA');  // insert your 'Title' to add to legend
});

$.getJSON("src/1963-SMSA.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'green',
        'weight': 4
      }
    }
  });  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(geoJsonLayer, '1963 SMSA');  // insert your 'Title' to add to legend
});

$.getJSON("src/1973-SMSA.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'purple',
        'weight': 4
      }
    }
  });  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(geoJsonLayer, '1973 SMSA');  // insert your 'Title' to add to legend
});

$.getJSON("src/1983-PMSA.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'green',
        'weight': 4
      }
    }
  });  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(geoJsonLayer, '1983 PMSA');  // insert your 'Title' to add to legend
});

$.getJSON("src/1993-MSA.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'blue',
        'weight': 4
      }
    }
  }).addTo(map);  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(geoJsonLayer, '1993 MSA');  // insert your 'Title' to add to legend
});
