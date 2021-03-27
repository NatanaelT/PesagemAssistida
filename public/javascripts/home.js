function logout() {
    fetch('http://localhost:3000/logout').then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
    }).catch(function () {
        console.log("Booo");
    });
}