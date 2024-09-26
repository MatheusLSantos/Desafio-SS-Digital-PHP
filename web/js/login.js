document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Lógica para enviar email e senha para o backend
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'welcome.html'; // Redirecionar para a tela de boas-vindas
        } else {
            alert(data.message); // Mostrar mensagem de erro
        }
    })
    .catch(error => console.error('Erro:', error));
});
