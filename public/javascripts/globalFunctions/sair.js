function sair() {
    document.cookie = "token="
    location.reload()
    location.replace('http://localhost:3000/login')
}