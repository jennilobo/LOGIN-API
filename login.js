document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#loginForm");
    const registerButton = document.querySelector("#registerButton");
    const alertContainer = document.querySelector("#alertContainer");

    function login(event) {
        event.preventDefault();
        
        const email = form.email.value;
        const senha = form.senha.value;

        if (!email || !senha) {
            showAlert("Preencha todos os campos.", "danger", alertContainer);
            return;
        }

        const userData = {
            email: email,
            senha: senha,
        };

        axios.post("https://api-recados-oixo.onrender.com/usuarios/login", userData)
            .then((response) => {
                const user = response.data.usuario;
                const userId = user.identificador;

                localStorage.setItem("userId", userId);
                showAlert("Login successful! Redirecting to scrapbook...", "success", alertContainer);
                console.log(`User logged:\nNome: ${user.nome}\nEmail: ${user.email}`);
                redirectToPageAfterDelay("lista_recados.html", alertContainer);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    showAlert("Invalid email or password.", "danger", alertContainer);
                } else if (error.response.status === 404) {
                    showAlert("User not registered.", "danger", alertContainer);
                } else {
                    showAlert("Error logging in.", "danger", alertContainer);
                }
            });
    }

    form.addEventListener("submit", login);

    registerButton.addEventListener("click", function () {
        redirectToPageAfterDelay("cadastro_usuario.html", alertContainer);
    });
});
