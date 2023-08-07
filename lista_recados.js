document.addEventListener("DOMContentLoaded", function () {
    const recadosList = document.getElementById("recadosList");
    const backButton = document.getElementById("backButton");

    function getUserIdFromSession() {
        return localStorage.getItem("userId");
    };

    function loadRecados() {
        const userId = getUserIdFromSession();

        axios.get(`https://api-recados-oixo.onrender.com/recados/${userId}`)
            .then((response) => {
                const recados = response.data.recados;

                recadosList.innerHTML = "";

                recados.forEach((recado) => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${recado.titulo}</strong>: ${recado.descricao}`;
                    recadosList.appendChild(li);
                });
            })
            .catch((error) => {
                console.error("Erro ao carregar os recados:", error);
            });
    };

    if (backButton) {
        backButton.addEventListener("click", function () {
            window.location.href = "login.html";
        });
    };

    const btnSair = document.getElementById("btnSair");
    if (btnSair) {
        btnSair.addEventListener("click", function () {
            sair();
        });
    };

    loadRecados();
});

function sair() {
    window.location.href = "login.html";
};
