function INF_renderLocation(data) {
  console.log('data', data);

  console.log('position', data.position);

  INF_addMessage(data.type, null, data, 'location', new Date());

  // Create the map
  const map = new google.maps.Map(document.getElementById(data.mapId), {
    zoom: 15,
    center: data.position,
  });

  // Draw the marker at the position
  new google.maps.Marker({
    position: data.position,
    map: map,
    draggable: false,
    title: 'My Location',
  });

  return;
}

function INF_sendLocation(e) {
  try {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let myPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Generate simple unique id for render each maps
        const mapId = 'location-' + Date.now().toString();

        const message = {
          mapId: mapId,
          position: myPosition,
          latitude: myPosition.lat,
          longitude: myPosition.lng,
          type: 'out',
          messageType: 'location',
        };

        INF_sendMap(message, INF_renderLocation);
      },
      (error) => {
        console.error(error);
      }
    );
  } catch (error) {
    console.error(error);
  }
}

function INF_initLocationAPI() {
  if (navigator.geolocation) {
    $('#location-list').css('display', 'list-item');
    document
      .getElementById('location-list-button')
      .addEventListener('click', INF_sendLocation);
  } else {
    console.log("Browser doesn't support Geolocation");
  }

  // alert('halo');
}
