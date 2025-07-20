var map = new maplibregl.Map({
        container: 'map', // container id
        style: 'style.json', // style URL for basemap
        center: [-97.974973, 39.421682], // starting position [lng, lat]
        zoom: 4 // starting zoom
    });

map.addControl(new maplibregl.NavigationControl());

fetch('ip_locations.geojson')
    .then((response) => response.json())
    .then((data) => {
        console.log("Data fetched successfully:", data);

        map.on('load', () => {
            map.addSource('ip-points', {
                type: 'geojson',
                data: data
            });

            map.addLayer({
                id: 'ip-points-layer',
                type: 'circle',
                source: 'ip-points',
                paint: {
                    "circle-radius": 8,
                    "circle-stroke-width": 1,
                    "circle-color": "#ff0000ff",
                    "circle-stroke-color": "white",
                },
            });

    map.addLayer({
        'id': 'restaurants-layer',
        'type': 'circle',
        'source': 'restaurants',
        paint: {
            "circle-radius": 5,
            "circle-stroke-width": 1,
            "circle-color": "#ff0000ff",
            "circle-stroke-color": "white",
        },
    });

    map.on("click", "restaurants-layer", (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.dba
    new maplibregl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });
})
})
.catch((error) => console.error("Error fetching data:", error));



