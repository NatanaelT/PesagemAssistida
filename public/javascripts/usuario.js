function buscar() {
    fetch('http://localhost:3000/usuarios', { credentials:"include" }).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
      }).catch(function() {
        console.log("Booo");
      });
}