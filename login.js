const form = document.querySelector("#loginForm");
const registerButton = document.querySelector("#registerButton");

function login(event) {
    event.preventDefault();
    const email = form.email.value;
    const senha = form.senha.value;

    if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
    };

    const userData = {
        email: email,
        senha: senha,
    };

    axios.post("https://api-recados-oixo.onrender.com/usuarios/login", userData)
        .then((response) => {
            const user = response.data.usuario;
            const userId = user.identificador;

            localStorage.setItem("userId", userId);

            window.location.href = "lista_recados.html";
        })
        .catch((error) => {
            alert("Email ou senha inválidos.");
        });
}

form.addEventListener("submit", login);

registerButton.addEventListener("click", function () {
    window.location.href = "cadastro_usuario.html";
});
