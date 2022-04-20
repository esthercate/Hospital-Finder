mapboxgl.accessToken = 'pk.eyJ1IjoiZXN0aGVyY2F0ZXYiLCJhIjoiY2wyN2w3M256MDBqYjN0bW1uOG16ZzVqdiJ9.apozKCwK2RIwWPweckfjSg';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position) {
  console.log(position);
  setUpMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setUpMap([36.817223, -1.286389])
}

function setUpMap(center) {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 15
  })

  const marker1 = new mapboxgl.Marker()
    .setLngLat([36.817223, -1.286389])
    .addTo(map);

  //adds direction plugin
  map.addControl(
    new MapboxDirections({
      accessToken: mapboxgl.accessToken
    }),
    'top-left'
  );

  //adds zoom and rotate controls
  const navControls = map.addControl(new mapboxgl.NavigationControl());
}