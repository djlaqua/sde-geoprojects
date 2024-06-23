   // Leaflet map initialization functions 
   //Full screen view function - map
    var mapId = document.getElementById('map');
    function FullDisplayView() {
        mapId.requestFullscreen();
    }
    
    // Map Printing Functionalities on page with a mix of this tool from src: https://github.com/Igor-Vladyka/leaflet.browser.print
     $('.print-map').click(function () { // jQuery function to print map
        window.print();
    });

    L.control.browserPrint({position: 'topright' }).addTo(map); // Print button location addes to map

    // leaflet browser print tool : https://github.com/Igor-Vladyka/leaflet.browser.print
    //var browserControl = L.control.browserPrint(options).addTo(map);    
    
    //Map Geocoder for searching locations - Leaflet Geocoder plugin source : https://github.com/Leaflet/Leaflet.markercluster
    L.Control.geocoder().addTo(map);

    // Measure distance & area tool function 
    L.control.measure({
        primaryLengthUnit: 'kilometers',  // setting the main unit measurement to kilometers
        secondaryLengthUnit: 'meters',
        primaryAreaUnit: 'sqmeters',
        secondaryAreaUnit: undefined
    }).addTo(map); 

    // Adding a Zoom to extent/layer Map Function via JQuery function
    $('.zoom_to_layer_extent').click(function(){
        //map.fitBounds(markers.getBounds()); //Auto zoom to the extent of the markers
        map.setView([52.5200, 13.4050], 12) // Berlin location
    });