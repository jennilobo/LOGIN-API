document.addEventListener("DOMContentLoaded", function () {
    const recadosList = document.getElementById("recadosList");
    const prevPageButton = document.getElementById("prevPage");
    const nextPageButton = document.getElementById("nextPage");
    const currentPageSpan = document.getElementById("currentPage");
    const backButton = document.getElementById("btnSair");
    const restoreButton = document.getElementById("btnRestaurar");

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

                const recadosExcluidos = getRecadosExcluidosFromStorage();

                if (recados.length === 0) {
                    const noRecadosMessage = document.createElement("p");
                    noRecadosMessage.className = "no-recados-message text-center";
                    noRecadosMessage.textContent = "No messages available.";
                    recadosList.appendChild(noRecadosMessage);
                } else {
                    recados.forEach((recado) => {
                        const card = document.createElement("div");
                        card.className = "card";
                        card.dataset.recadoId = recado.identificador;

                        if (recadosExcluidos.includes(recado.identificador)) {
                            card.style.display = "none";
                        }

                        card.innerHTML = `
                            <div class="card-body">
                                <h5 class="card-title">${recado.titulo}</h5>
                                <p class="card-text">${recado.descricao}</p>
                                <button class="btn btn-danger btn-sm excluir-btn" data-recado-id="${recado.identificador}">Excluir</button>
                            </div>`;
                        recadosList.appendChild(card);
                    });
                }
                currentPage = page;
                currentPageSpan.textContent = `Página: ${currentPage}`;

                prevPageButton.classList.toggle("disabled", currentPage === 1);
                nextPageButton.classList.toggle("disabled", (currentPage * pageSize) >= totalRecados);
            })
            .catch((error) => {
                console.error("Erro ao carregar os recados:", error);
            });
    }

    

    function getRecadosExcluidosFromStorage() {
        const recadosExcluidos = localStorage.getItem("recadosExcluidos");
        return recadosExcluidos ? JSON.parse(recadosExcluidos) : [];
    }

    function excluirRecado(recadoId) {
        const userId = getUserIdFromSession();

        if (!userId) {
            window.location.href = "cadastro_usuario.html";
            return;
        }

        const recadoCard = document.querySelector(`[data-recado-id="${recadoId}"]`);
        if (recadoCard) {
            recadoCard.style.display = "none";
            addRecadoExcluidoToStorage(recadoId);
        }
    }

    function addRecadoExcluidoToStorage(recadoId) {
        const recadosExcluidos = getRecadosExcluidosFromStorage();
        recadosExcluidos.push(recadoId);
        localStorage.setItem("recadosExcluidos", JSON.stringify(recadosExcluidos));
    }

    function restaurarRecadosExcluidos() {
        const recadosExcluidos = getRecadosExcluidosFromStorage();
        recadosExcluidos.forEach((recadoId) => {
            const recadoCard = document.querySelector(`[data-recado-id="${recadoId}"]`);
            if (recadoCard) {
                recadoCard.style.display = "block";
            }
        });
    }

    function restaurarTodosRecados() {
        const recadoCards = document.querySelectorAll(".card");
        recadoCards.forEach((card) => {
            card.style.display = "block";
        });
        localStorage.removeItem("recadosExcluidos");
    }

    if (restoreButton) {
        restoreButton.addEventListener("click", function () {
            restaurarTodosRecados();
        });
    }

    restaurarRecadosExcluidos();

    window.addEventListener("beforeunload", function () {
        localStorage.setItem("currentPage", currentPage);
    });

    if (recadosList) {
        recadosList.addEventListener("click", function (event) {
            const target = event.target;

            if (target.classList.contains("excluir-btn")) {
                const recadoId = parseInt(target.getAttribute("data-recado-id"));
                if (!isNaN(recadoId)) {
                    excluirRecado(recadoId);
                }
            }
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
        localStorage.removeItem("userId");
        localStorage.removeItem("recadosExcluidos");
        window.location.href = "login.html";
    }

    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
        currentPage = parseInt(savedPage);
    }

    loadRecados(currentPage);
});
