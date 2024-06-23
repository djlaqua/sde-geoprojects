// This is the main.js file for the leaflet map application
    // initialized map class   
    //var map = L.map('map', {   //measure tool plugin map control set
    //    measureControl: true,
    //}).setView([52.5200, 13.4050], 10); // Berlin location
    var map = L.map('map').setView([52.5200, 13.4050], 10); //  Berlin location
    map.zoomControl.setPosition('topright');   // changing the zoom control settings

    // osm tile-layer for leaflet js map 
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Leaflet layer control - Adding more Basemaps (ESRI etc.) to the Interactive Web-Map. Source: https://leaflet-extras.github.io/leaflet-providers/preview/
    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // Stadia Stamen Terrain BaseMap - source same as above
    var Stadia_StamenTerrain = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
    });


    // addition of marker to map-center
    var LoneMarker = L.marker([52.5200, 13.4050]).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup(); 

    // map scale addition
    L.control.scale().addTo(map)
    //L.control.scale({position: 'bottomright'}).addTo(map)

    // Display Map Geo Coordinates when mouse moves to show on page
    map.on('mousemove', function(e) {
        console.log(e)
        $('.coordinate').html(`Lat:  ${e.latlng.lat} Lng: ${e.latlng.lng}`)  // using jQuery selects from the coordinate class above in 'body'

    });    

    // Loading in the test.js geosjon Data Point Clusters into the map
    //L.geoJSON(data).addTo(map);  // data is the geojson file loaded in the test.js file
    var markers = L.markerClusterGroup();  // marker cluster leaflet plugin source: https://github.com/Leaflet/Leaflet.markercluster
    //var Berlin = L.geoJSON(data).addTo(map);  // adding the geojson data to the map or add popups below
    var Berlin = L.geoJSON(data, {
        onEachFeature: function (feature, layer) { // adding popups to the markers via iterating through eash dictionary object in the geojson
            layer.bindPopup(feature.properties.names_in_all);
        }
    });         
    Berlin.addTo(markers)
    //markers.addTo(map); // adding the markers to the map - way 1

    // Map Geocoder for searching locations - Leaflet Geocoder plugin source : https://github.com/Leaflet/Leaflet.markercluster
    L.Control.geocoder().addTo(map);

    // Leaflet layer control to the map - adding various layer basemap tile layers 
    var baseMaps = {
        'OSM': osm,
        'Esri World Imagery': Esri_WorldImagery,
        'Stadia Stamen Terrain': Stadia_StamenTerrain
    }
    // adding the geojson data to the map
    var overlayMaps = { 
        'GeoJSON JS Markers': markers,
        'Lone Marker': LoneMarker

    }

    L.control.layers(baseMaps, overlayMaps).addTo(map);  // adding the layer control in a different way to the map + Added markers to map, way 2

