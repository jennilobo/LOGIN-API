document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#cadastroForm");
    const backButton = document.querySelector("#loginLink");
    const showAlertContainer = document.querySelector("#showAlert");

    async function cadastrar(event) {
        event.preventDefault();

        const nome = form.nome.value;
        const email = form.email.value;
        const senha = form.senha.value;

        if (!nome || !email || !senha) {
            showAlert("Preencha todos os campos.", "danger", showAlertContainer);
            return;
        }

        const userData = {
            nome: nome,
            email: email,
            senha: senha,
        };

        try {
            const response = await axios.post("https://api-recados-oixo.onrender.com/usuarios", userData);
            showAlert("Registered successfully! Redirecting to login page...", "success", showAlertContainer);
            console.log(`Registered User:\nNome: ${nome}\nEmail: ${email}`);
            localStorage.setItem("registeredUser", JSON.stringify({ nome, email }));
            redirectToPageAfterDelay("login.html", showAlertContainer);
        } catch (error) {
            showAlert("Error registering user. Try another email.", "danger", showAlertContainer);
        }
    }

    form.addEventListener("submit", cadastrar);

    loginLink.addEventListener("click", function () {
        redirectToPageAfterDelay("login.html", showAlertContainer);
    });
});
