  var map = tt.map({
    key: '97P6hy6HlqtzhQnGGtCdQR2ZAfOsHwGK',
    container: 'map',
});

fetch('http://localhost:3000/hospitais')
  .then(response => response.json())
  .then(hospitais => {
    hospitais.forEach(function(hospital) {
      var marker = new tt.Marker() 
        .setLngLat([hospital.longitude, hospital.latitude]) 
        .addTo(map);

      marker.getElement().addEventListener('click', function() {
        showInfoWindow(hospital.nome);
      });
    });
  })
  .catch(error => console.error('Erro ao buscar os hospitais', error));

function showInfoWindow(hospitalName) {
    var infoWindow = document.getElementById('infoWindow');
    infoWindow.textContent = hospitalName;
    infoWindow.style.display = 'block';
}
