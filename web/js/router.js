
// Espera que o DOM esteja completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    
    // Verifica a URL atual
    const currentUrl = window.location.pathname;

    // Redireciona com base na presença do token
    if (!token) {
        // Se não houver token, redireciona para a página de login
        if (currentUrl !== '/index.html') {
            window.location.href = 'index.html';
        }
    } else {
        // Se houver token, redireciona para a página de boas-vindas
        if (currentUrl === '/index.html') {
            window.location.href = 'welcome.html';
        }
    }
});
