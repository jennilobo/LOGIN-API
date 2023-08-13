document.addEventListener("DOMContentLoaded", function () {
    const recadosList = document.getElementById("recadosList");
    const prevPageButton = document.getElementById("prevPage");
    const nextPageButton = document.getElementById("nextPage");
    const currentPageSpan = document.getElementById("currentPage");
    const backButton = document.getElementById("btnSair");

    let currentPage = 1; 
    const pageSize = 2; 

    function getUserIdFromSession() {
        return localStorage.getItem("userId");
    }

    function loadRecados(page) {
        const userId = getUserIdFromSession();

        if (!userId) {
            window.location.href = "cadastro_usuario.html";
            return;
        }

        axios.get(`https://api-recados-oixo.onrender.com/recados/${userId}?page=${page}&pageSize=${pageSize}`)
            .then((response) => {
                const recados = response.data.recados;
                const totalRecados = response.data.quantidade;

                recadosList.innerHTML = "";

                recados.forEach((recado) => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${recado.titulo}</strong>: ${recado.descricao}`;
                    recadosList.appendChild(li);
                });

                currentPage = page;
                currentPageSpan.textContent = `Página: ${currentPage}`;

                prevPageButton.disabled = currentPage === 1;
                nextPageButton.disabled = (currentPage * pageSize) >= totalRecados;
            })
            .catch((error) => {
                console.error("Erro ao carregar os recados:", error);
            });
    }

    if (prevPageButton) {
        prevPageButton.addEventListener("click", function () {
            if (currentPage > 1) {
                loadRecados(currentPage - 1);
            }
        });
    }

    if (nextPageButton) {
        nextPageButton.addEventListener("click", function () {
            loadRecados(currentPage + 1);
        });
    }

    if (backButton) {
        backButton.addEventListener("click", function () {
            sair();
        });
    }
    
    function sair() {
        localStorage.removeItem("userId"); // Limpa o ID de usuário da sessão
        window.location.href = "login.html"; // Redireciona para a página de login
    }

    loadRecados(currentPage);
});
