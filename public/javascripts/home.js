window.onload = () => {
    document.getElementById('nome-usuario').innerText = localStorage.getItem('usuario')
}