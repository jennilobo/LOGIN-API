const form = document.querySelector("#cadastroForm");
const backButton = document.querySelector("#backButton");

function cadastrar(event) {
    event.preventDefault();
    const nome = form.nome.value;
    const email = form.email.value;
    const senha = form.senha.value;

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    const userData = {
        nome: nome,
        email: email,
        senha: senha,
    };

    axios.post("https://api-recados-oixo.onrender.com/usuarios", userData)
        .then((response) => {
            alert("Usuário cadastrado com sucesso.");
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert("Erro ao cadastrar usuário.");
        });
}

form.addEventListener("submit", cadastrar);

backButton.addEventListener("click", function () {
    window.location.href = "login.html";
});