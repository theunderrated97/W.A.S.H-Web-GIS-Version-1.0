//..................................map class initialize ............................................................

var map = L.map('map').setView([17.63, 78.48], 13);
map.zoomControl.setPosition('topright');

//...................................................................................................................



//.................................adding osm tilelayer.............................................................. 


var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// ..................................................................................................................



//.....................................add map scale.................................................................


L.control.scale().addTo(map);

// ..................................................................................................................


//.....................................Map coordinate display........................................................

map.on('mousemove', function (e) {
    const lat = e.latlng.lat.toFixed(6);
    const lng = e.latlng.lng.toFixed(6);
    $('.coordinate').html(`Lat: ${lat} Lng: ${lng}`);
});

// ..................................................................................................................



//.....................................Geojson Layers loading........................................................

// Define overlay layers

// Example: Creating GeoJSON layers
var layerMedchalToiletLocations;
var layerMajorRoads;
var layerULBBoundary;
var layerCTPTBuffer500mm;
var layerActivityZone500mm;
var layerActualDemandArea;

// Create a marker cluster group for each layer
var layerGroupMedchalToiletLocations = L.layerGroup();
var markerMajorRoads = L.markerClusterGroup();
var markerULBBoundary = L.markerClusterGroup();
var markerCTPTBuffer500mm = L.markerClusterGroup();
var markerActivityZone500mm = L.markerClusterGroup();
var markerActualDemandArea = L.markerClusterGroup();



$.getJSON('data/Medchal_Toilet_Locations.geojson', function (data) {
    // Create GeoJSON layer
    var layerMedchalToiletLocations = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            var popupContent = "<b>Name:</b> " + feature.properties.Name;
            layer.bindPopup(popupContent);
        },
        pointToLayer: function (feature, latlng) {
            var status = feature.properties['status o'];

            var iconUrl;
            switch (status) {
                case 'Toilet premise is open and attendant is available':
                    iconUrl = './lib/assets/Green.png'; // Replace with the actual path to your green icon
                    break;
                case 'Toilet premise is closed':
                    iconUrl = './lib/assets/Red.png';  // Replace with the actual path to your blue icon
                    break;
                case 'Toilet premise is open but no care taker is available':
                    iconUrl = './lib/assets/Blue.png';  // Replace with the actual path to your yellow icon
                    break;
                default:
                    iconUrl = './lib/assets/Black.png';  // Replace with the actual path to your default icon
            }

            // Use the selected icon
            var customIcon = L.icon({
                iconUrl: iconUrl,
                iconSize: [48, 48],  // Adjust the size as needed
                iconAnchor: [16, 32],  // Adjust the anchor point as needed
                popupAnchor: [0, -32]  // Adjust the popup anchor point as needed
            });

            // Create a marker with the custom icon
            return L.marker(latlng, { icon: customIcon });
        },
        style: {
            smoothFactor: 2
        }
    });

    // Add the GeoJSON layer to the layer group
    layerGroupMedchalToiletLocations.addLayer(layerMedchalToiletLocations);

    // Add the layer group to the map
    layerGroupMedchalToiletLocations.addTo(map);
});








// Load GeoJSON data for Major_Roads.geojson
$.getJSON('data/Major Roads.geojson', function (data) {
    layerMajorRoads = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            var popupContent = "<b>Name:</b> " + feature.properties.Name;

            layer.bindPopup(popupContent);
        },
        style: {
            color: '#666666',
            smoothFactor: 0.000001  // Adjust this value for smoother or less smooth curves
        }
    });

    markerMajorRoads.addLayer(layerMajorRoads);
    map.addLayer(markerMajorRoads);
});



$.getJSON('data/ULB_Boundary.geojson', function (data) {
    layerULBBoundary = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            var popupContent = "<b>Name:</b> " + feature.properties.Name;
            layer.bindPopup(popupContent);
        },
        style: {
            fill: false,  // No fill
            color: 'black',  // Set the boundary color to dark black
            dashArray: '5, 5',  // Adjust the dash pattern as needed
            smoothFactor: 0.000001  // Adjust this value for smoother or less smooth curves
        }
    });

    markerULBBoundary.addLayer(layerULBBoundary);
    map.addLayer(markerULBBoundary);
});


// Load GeoJSON data for CTPT_Buffer500mm.geojson
$.getJSON('data/CTPT Buffer500mm.geojson', function (data) {
    layerCTPTBuffer500mm = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            var popupContent = "<b>Name:</b> " + feature.properties.Name;

            layer.bindPopup(popupContent);
        },
        style: {
            fillColor: 'rgba(255, 255, 25, 0.7)', // Light yellow fill color with alpha (transparency)
            color: 'rgba(255, 255, 150, 0.8)',    // Light yellow outline color with alpha (transparency)
            smoothFactor: 0.000001  // Adjust this value for smoother or less smooth curves
        }
    });

    markerCTPTBuffer500mm.addLayer(layerCTPTBuffer500mm);
    map.addLayer(markerCTPTBuffer500mm);
});


// Load GeoJSON data for Activityzone500mm.geojson
$.getJSON('data/Activityzone500mm1.geojson', function (data) {
    layerActivityZone500mm = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            var popupContent = "<b>Name:</b> " + feature.properties.Name + "<br>" +
                               "<b>Zone:</b> " + feature.properties.zone;

            layer.bindPopup(popupContent);
        },
        style: {
            smoothFactor: 0.000001  // Adjust this value for smoother or less smooth curves
        }
    });

    markerActivityZone500mm.addLayer(layerActivityZone500mm);
    map.addLayer(markerActivityZone500mm);
});

// Load GeoJSON data for Actual_Demand_Area.geojson
$.getJSON('data/Actual Demand Area.geojson', function (data) {
    layerActualDemandArea = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            var popupContent = "<b>Name:</b> " + feature.properties.Name;

            layer.bindPopup(popupContent);
        },
        style: {
            smoothFactor: 0.000001  // Adjust this value for smoother or less smooth curves
        }
    });

    markerActualDemandArea.addLayer(layerActualDemandArea);
    map.addLayer(markerActualDemandArea);
});

// ............................................End of GeoJSON Layers loading..................................................



//.............................................Adding Basemaps and overlayers to layerswitcher................................


var baseMaps = {
    'OSM': osm,
    // 'WaterColor': watercolorMap,


    // 'Stamen Toner': st
}

var overlays = {
    "Medchal Toilet Locations": layerGroupMedchalToiletLocations,
    "Major Roads": markerMajorRoads,
    "ULB Boundary": markerULBBoundary,
    "CTPT Buffer500mm": markerCTPTBuffer500mm,
    "Activity Zone500mm": markerActivityZone500mm,
    "Actual Demand Area": markerActualDemandArea
}
L.control.layers(baseMaps,overlays,{position:'topleft'}).addTo(map);


// .............................................................................................................................

